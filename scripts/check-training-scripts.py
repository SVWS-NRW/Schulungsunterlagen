"""Regression checks without installing services or modifying real databases."""
from pathlib import Path
import json, os, shutil, subprocess, tempfile, unittest

ROOT = Path(__file__).resolve().parents[1]
SECTION = ROOT / "Fachberatung_Anleitungen/Test-_und_Schulungsserver"
SHELL = os.environ.get("FBM_BASH", "bash")

class ScriptChecks(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.work = Path(self.tmp.name)
        self.bin = self.work / "bin"
        self.bin.mkdir()
        self.log = self.work / "calls.jsonl"
        self.env = dict(os.environ, PATH=str(self.bin) + os.pathsep + os.environ["PATH"], FBM_TEST_LOG=str(self.log))
    def tearDown(self):
        self.tmp.cleanup()
    def stub(self, name, body):
        file = self.bin / name
        file.write_text("#!/usr/bin/env python3\n" + body, encoding="utf-8")
        file.chmod(0o755)
    def run_script(self, relative, *args, env=None):
        return subprocess.run([SHELL, str(SECTION / relative), *args], cwd=self.work,
                              env=env or self.env, text=True, capture_output=True, timeout=15)
    def calls(self):
        return [json.loads(line) for line in self.log.read_text().splitlines()] if self.log.exists() else []
    def command_stub(self, name):
        self.stub(name, "import os,sys,json\nwith open(os.environ['FBM_TEST_LOG'],'a') as f: f.write(json.dumps(sys.argv[1:])+'\\n')\nraise SystemExit(int(os.environ.get('FBM_STUB_EXIT','0')))\n")
    def prepare(self, name="schulung", *extra):
        return self.run_script("Docker_Schulungsserver/docker_create_svws.sh", "-o", name, "-v", "1.4.1", "--db-version", "11.8", "-p", "Testpasswort_123", "--prepare-only", *extra)
    def test_all_scripts_parse_and_help_has_no_external_effects(self):
        for name in ["apt", "apt-get", "docker", "pct", "curl", "wget", "mysql", "mariadb", "systemctl", "certbot"]:
            self.stub(name, "raise SystemExit('Help executed an external command')\n")
        scripts = sorted(SECTION.rglob("*.sh"))
        self.assertEqual(len(scripts), 27)
        for file in scripts:
            with self.subTest(file=file.name):
                syntax = subprocess.run([SHELL, "-n", str(file)], capture_output=True, text=True)
                self.assertEqual(syntax.returncode, 0, syntax.stderr)
                result = self.run_script(file.relative_to(SECTION), "--help")
                self.assertEqual(result.returncode, 0, result.stderr)
    def test_generator_prepares_without_docker_and_refuses_overwrite(self):
        self.assertEqual(self.prepare().returncode, 0)
        folder = self.work / "schulung"
        before = (folder / ".env").read_text()
        self.assertNotIn("Testpasswort_123", self.prepare("zweites").stdout)
        self.assertNotEqual(self.prepare().returncode, 0)
        self.assertEqual((folder / ".env").read_text(), before)
        if os.name != "nt": self.assertEqual((folder / ".env").stat().st_mode & 0o777, 0o600)
        compose = (folder / "docker-compose.yml").read_text()
        self.assertIn("127.0.0.1:8443:8443", compose)
        self.assertNotIn(":3306", compose)
        self.assertNotIn(":latest", compose)
    def test_generator_rejects_invalid_and_missing_arguments(self):
        for args in [("-pt",), ("-pt", "0"), ("-pt", "999999999999999"), ("--bind", "999.1.1.1"), ("-dn", "../../etc"), ("-v", "latest"), ("-mp", "8443")]:
            with self.subTest(args=args):
                self.assertNotEqual(self.prepare("invalid", *args).returncode, 0)
                self.assertFalse((self.work / "invalid").exists())
    def test_generator_optional_mariadb_port_and_alias(self):
        result = self.prepare("mit-db", "--bind", "127.0.0.1", "-mp", "13306")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("127.0.0.1:13306:3306", (self.work/"mit-db/docker-compose.yml").read_text())
        result = self.run_script("Docker_Schulungsserver/install_svws_testserver_docker.sh", "-o", "alias", "-v", "1.4.1", "--db-version", "11.8", "-p", "Testpasswort_123", "--prepare-only")
        self.assertEqual(result.returncode, 0, result.stderr)
    def test_project_deletion_does_not_touch_global_container_list_or_data(self):
        self.assertEqual(self.prepare().returncode, 0)
        self.command_stub("docker")
        data = self.work/"schulung/volume/mariadb"
        data.mkdir(parents=True)
        sentinel = data/"keep"
        sentinel.write_text("original")
        for script in ["delete_all_docker_container.sh", "docker_rm_all_container.sh"]:
            self.log.unlink(missing_ok=True)
            result = self.run_script("Docker_Schulungsserver/"+script, "--project-dir", "schulung")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertFalse(any("down" in call for call in self.calls()))
            result = self.run_script("Docker_Schulungsserver/"+script, "--project-dir", "schulung", "--execute")
            self.assertEqual(result.returncode, 0)
            self.assertEqual(self.calls()[-1][-1], "down")
            self.assertFalse(any("ps" in call or "--volumes" in call or "-v" in call for call in self.calls()))
            self.assertEqual(sentinel.read_text(), "original")
        failed = dict(self.env, FBM_STUB_EXIT="7")
        self.log.unlink(missing_ok=True)
        result = self.run_script("Docker_Schulungsserver/delete_all_docker_container.sh", "--project-dir", "schulung", "--execute", env=failed)
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(any("down" in call for call in self.calls()))
    def test_import_requires_real_file_and_propagates_http_failure(self):
        self.command_stub("curl")
        f = self.work/"sample.sqlite"
        f.write_bytes(b"SQLite format 3" + bytes(101))
        env = dict(self.env, SVWS_ROOT_PASSWORD="SecretRoot", SVWS_SCHEMA_PASSWORD="SecretSchema")
        args = ("-f", str(f), "-n", "platz01", "-u", "platz01")
        result = self.run_script("Installationsskripte/create_svws_testdbs.sh", *args, env=env)
        self.assertEqual(result.returncode, 0, result.stderr)
        call = self.calls()[0]
        self.assertIn("--fail-with-body", call)
        self.assertNotIn("--insecure", call)
        self.assertIn("schemaUserPassword=SecretSchema", call)
        self.assertNotIn("Secret", result.stdout)
        result = self.run_script("Installationsskripte/create_svws_testdbs.sh", *args, env=dict(env, FBM_STUB_EXIT="22"))
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("erfolgreich", result.stdout)
        f.write_text("<html>404</html>")
        self.log.unlink(missing_ok=True)
        self.assertNotEqual(self.run_script("Installationsskripte/create_svws_testdbs.sh", *args, env=env).returncode, 0)
        self.assertFalse(self.calls())
    def test_schema_delete_is_scoped_and_requires_explicit_target(self):
        self.command_stub("curl")
        script = "Installationsskripte/delete_all_svws_dbs.sh"
        self.assertNotEqual(self.run_script(script).returncode, 0)
        self.assertEqual(self.run_script(script, "--schema", "platz01").returncode, 0)
        self.assertFalse(self.calls())
        env = dict(self.env, SVWS_ROOT_PASSWORD="secret")
        self.assertNotEqual(self.run_script(script, "--schema", "platz01", "--execute", "--confirm-server", "other", env=env).returncode, 0)
        self.assertFalse(self.calls())
        self.assertEqual(self.run_script(script, "--schema", "platz01", "--execute", "--confirm-server", "localhost", env=env).returncode, 0)
        self.assertTrue(any(url.endswith("/destroy/platz01") for url in self.calls()[0]))
    def test_experimental_builds_cannot_run_accidentally(self):
        for name in ["install_svws_schild3_svws-tools_testserver.sh","install_svws_testserver_fromScratch.sh","update_testserver_from_scratch.sh","generate_svws_userpasswords.sh","wenom_to_multiwenom.sh"]:
            result = self.run_script("Installationsskripte/"+name, env=dict(self.env, FBM_EXPERIMENTAL=""))
            self.assertEqual(result.returncode, 78, name)
            self.assertFalse(self.calls())
    def test_proxmox_shutdown_validates_all_ids_before_stopping(self):
        self.command_stub("pct")
        script="Proxmox_Schulungsserver/pve_shutdown_all_LXC.sh"
        self.assertNotEqual(self.run_script(script).returncode, 0)
        self.assertNotEqual(self.run_script(script, "101", "invalid").returncode, 0)
        self.assertFalse(any("shutdown" in call for call in self.calls()))
        self.assertEqual(self.run_script(script, "101", "105").returncode, 0)
        selected=[call for call in self.calls() if call[0]=="shutdown"]
        self.assertEqual([call[1] for call in selected], ["101", "105"])
        self.assertFalse(any("stop" in call for call in self.calls()))
    def test_proxmox_create_dhcp_and_explicit_cidr(self):
        self.stub("pct", "import os,sys,json\nwith open(os.environ['FBM_TEST_LOG'],'a') as f: f.write(json.dumps(sys.argv[1:])+'\\n')\nraise SystemExit(1 if sys.argv[1]=='config' else 0)\n")
        env=dict(self.env,LXC_TEMPLATE="local:vztmpl/debian.tar.zst",VSWITCH="vmbr0",STORAGE="local-lvm",GATEWAY="192.168.50.1")
        script="Proxmox_Schulungsserver/pve_create_lxc.sh"
        self.assertEqual(self.run_script(script,"-nr","101","-p","Testpasswort_123",env=env).returncode,0)
        call=next(call for call in self.calls() if call[0]=="create")
        network=call[call.index("--net0")+1]
        self.assertIn("ip=dhcp",network)
        self.assertNotIn("gw=",network)
        self.log.unlink()
        self.assertEqual(self.run_script(script,"-nr","102","-p","Testpasswort_123","-ip","192.168.50.20/24",env=env).returncode,0)
        call=next(call for call in self.calls() if call[0]=="create")
        self.assertIn("ip=192.168.50.20/24",call[call.index("--net0")+1])
    def test_proxmox_delete_preview_never_executes_pct(self):
        self.command_stub("pct")
        result=self.run_script("Proxmox_Schulungsserver/pve_delete_all_svws_dbs.sh","-nr","101","--schema","platz01")
        self.assertEqual(result.returncode,0,result.stderr)
        self.assertFalse(self.calls())


    def test_linux_prepare_creates_protected_env_without_running_installer(self):
        self.stub("curl", "import sys,pathlib,os\nif os.environ.get('FBM_STUB_EXIT'): raise SystemExit(int(os.environ['FBM_STUB_EXIT']))\npathlib.Path(sys.argv[sys.argv.index('-o')+1]).write_text('#!/usr/bin/env bash\\ntouch UNEXPECTED_INSTALL\\n')\n")
        script="Installationsskripte/install_svws_testserver_linuxinstaller.sh"
        result=self.run_script(script,"-v","1.4.1","-p","Testpasswort_123","--prepare-only")
        self.assertEqual(result.returncode,0,result.stderr)
        work=self.work/"svws-install-1.4.1"
        self.assertIn("APP_PORT=8443",(work/".env").read_text())
        self.assertFalse((work/"UNEXPECTED_INSTALL").exists())
        self.assertNotEqual(self.run_script(script,"-v","1.4.1","-p","Testpasswort_123","--prepare-only").returncode,0)
        result=self.run_script(script,"-v","1.4.0","-p","Testpasswort_123","--prepare-only",env=dict(self.env,FBM_STUB_EXIT="22"))
        self.assertNotEqual(result.returncode,0)
        self.assertFalse((self.work/"svws-install-1.4.0/.env").exists())
    @unittest.skipUnless(shutil.which("jq"), "jq required for downloader test")
    def test_downloader_uses_current_repository_and_stops_on_http_error(self):
        self.stub("curl", "import sys,os,json,pathlib\nif os.environ.get('FBM_STUB_EXIT'): raise SystemExit(int(os.environ['FBM_STUB_EXIT']))\nif '-o' in sys.argv: pathlib.Path(sys.argv[sys.argv.index('-o')+1]).write_text('#!/bin/bash\\n')\nelse: print(json.dumps([{'type':'file','name':'demo.sh','download_url':'https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/dev/demo.sh'},{'type':'file','name':'index.md','download_url':'https://raw.githubusercontent.com/Raffenberg/SVWS_FBM/dev/index.md'}]))\n")
        result=self.run_script("Installationsskripte/download_all_scripts.sh","downloads")
        self.assertEqual(result.returncode,0,result.stderr)
        self.assertTrue((self.work/"downloads/demo.sh").exists())
        self.assertFalse((self.work/"downloads/index.md").exists())
        result=self.run_script("Installationsskripte/download_all_scripts.sh","failed",env=dict(self.env,FBM_STUB_EXIT="22"))
        self.assertNotEqual(result.returncode,0)
        self.assertFalse((self.work/"failed").exists())
    def test_docker_import_uses_actual_bind_address_and_no_container_download(self):
        self.stub("docker", "import sys\nprint('true' if sys.argv[1]=='inspect' else '192.168.50.10:18443')\n")
        self.command_stub("curl")
        f=self.work/"sample.sqlite"
        f.write_bytes(b"SQLite format 3"+bytes(100))
        env=dict(self.env,SVWS_ROOT_PASSWORD="secret",SVWS_SCHEMA_PASSWORD="schema-secret")
        result=self.run_script("Docker_Schulungsserver/docker_multimport_sqlite.sh","-nr","svws_svwsserver","-f",str(f),"-n","platz01","-u","platz01",env=env)
        self.assertEqual(result.returncode,0,result.stderr)
        self.assertIn("https://192.168.50.10:18443/api/schema/root/import/sqlite/platz01",self.calls()[0])
    def test_proxmox_installer_transfers_local_script_without_shell_interpolation(self):
        self.command_stub("pct")
        result=self.run_script("Proxmox_Schulungsserver/pve_exec_svws_linuxinstaller.sh","-nr","101","-v","1.4.1","-p","Testpasswort_123")
        self.assertEqual(result.returncode,0,result.stderr)
        calls=self.calls()
        self.assertEqual([call[0] for call in calls],["config","push","exec"])
        self.assertFalse(any("wget" in call or "-c" in call for call in calls))

if __name__ == "__main__":
    unittest.main(verbosity=2)
