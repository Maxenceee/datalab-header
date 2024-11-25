const vscode = require('vscode');
const { renderHeader, supportsLanguage } = require('./header');

const getCurrentProjectName = () => vscode.workspace.getConfiguration().get('datalab-header.projectName') || "Nom du projet";

const getCurrentProjectAuthor = () => vscode.workspace.getConfiguration().get('datalab-header.author') || "L'équipe du DataLab";

const printHeader = () => {
	const { activeTextEditor } = vscode.window;
	const { document } = activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
	if (supportsLanguage(document.languageId)) {
		activeTextEditor.edit(editor => {
			editor.insert(
				new vscode.Position(0, 0),
				renderHeader(
					document.languageId,
					getCurrentProjectName(),
					getCurrentProjectAuthor(),
				)
			);
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
