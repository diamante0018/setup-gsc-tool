const core = require("@actions/core")
const exec = require('@actions/exec');
const tc = require("@actions/tool-cache")
const path = require("path")

async function set_executable_permissions(file_path) {
    if (process.platform == "win32") {
        return
    }

    try {
        const binary_path = path.join(file_path, "gsc-tool")
        await exec.exec(`chmod +x ${binary_path}`)
        console.log(`Executable permissions set for ${binary_path}`)
    } catch (error) {
        console.error(`Error setting executable permissions: ${error}`)
    }
}

async function main() {
    const version = core.getInput('version', { required: true })
    const user_path = core.getInput('path', { required: false })

    if (user_path[0] == '/' || user_path[0] == '~') {
        throw new Error("Path must be relative to the workspace")
    }

    const gsc_tool_path = path.join(process.env.GITHUB_WORKSPACE, user_path)

    if (process.platform == "win32") {
        const path_prefix = "https://master.alterware.dev/tools/gsc-tool-" + version
        const gsc_tool = await tc.downloadTool(path_prefix + "-windows.zip")
        await tc.extractZip(gsc_tool, gsc_tool_path)
    }
    else if (process.platform == "darwin") {
        const path_prefix = "https://master.alterware.dev/tools/gsc-tool-" + version
        const gsc_tool = await tc.downloadTool(path_prefix + "-macosx.tar.gz")
        await tc.extractTar(gsc_tool, gsc_tool_path)
    }
    else {
        const path_prefix = "https://master.alterware.dev/tools/gsc-tool-" + version
        const gsc_tool = await tc.downloadTool(path_prefix + "-linux.tar.gz")
        await tc.extractTar(gsc_tool, gsc_tool_path)
    }

    core.addPath(gsc_tool_path)
    await set_executable_permissions(gsc_tool_path)
}

main().catch(err => {
    core.setFailed(`Failed to install gsc-tool: ${err}`);
})
