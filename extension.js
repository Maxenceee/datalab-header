const vscode = require('vscode');
const { getTemplate, supportsLanguage } = require('./header');

const getCurrentProjectName = () => vscode.workspace.getConfiguration().get('datalab-header.projectName') || "Nom du projet";

const printHeader = () => {
	var activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
    var document = activeTextEditor.document;
	console.log('====================================');
	console.log(document.languageId);
	console.log('====================================');
	if (supportsLanguage(document.languageId)) {
		const textheader = getTemplate(document.languageId, getCurrentProjectName());
		console.log('====================================');
		console.log(textheader);
		console.log('====================================');

		activeTextEditor.edit(function (editor) {
			editor.insert(new vscode.Position(0, 0), textheader);
		});
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('mg-header.printheader', printHeader);
	console.log('====================================');
	console.log(disposable);
	console.log('====================================');

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
