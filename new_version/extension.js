const vscode = require('vscode');
const { renderHeader, supportsLanguage, extractHeader } = require('./header');

const getCurrentProjectName = () => vscode.workspace.getConfiguration().get('datalab-header.projectName') || "Nom du projet";

const getCurrentStyle = () => vscode.workspace.getConfiguration().get('datalab-header.headerStyle') || "Style nouveau";

const printHeader = () => {
	const { activeTextEditor } = vscode.window;
	const { document } = activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
	if (supportsLanguage(document.languageId)) {
		activeTextEditor.edit(editor => {
			const currentHeader = extractHeader(document.getText())
			if (currentHeader) {
				editor.replace(
					new vscode.Range(0, 0, 10, 0),
					renderHeader(
						getCurrentStyle(),
						document.languageId,
						getCurrentProjectName()
					)
				);
			} else {
				editor.insert(
					new vscode.Position(0, 0),
					renderHeader(
						getCurrentStyle(),
						document.languageId,
						getCurrentProjectName()
					)
				);
			}
		});
	} else {
		vscode.window.showInformationMessage(`No header support for language ${document.languageId}`);
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('datalab-header.printheader', printHeader);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
