//==============================================================================
// ■ FileInput Directive
//------------------------------------------------------------------------------
// 		<amb-file-input><amb-file-input/>
//==============================================================================

//------------------------------------------------------------------------------
// ● Imports
//------------------------------------------------------------------------------
import angular from "angular";
//------------------------------------------------------------------------------
// ● Attributes
//------------------------------------------------------------------------------
const scope = {
	label: "@ambLabel",
	file: "=ambFile",
	url: "=ambUrl",
	disabled: "=ambDisabled"
};
//------------------------------------------------------------------------------
// ● Link
//------------------------------------------------------------------------------
function fileInputDirectiveLink(scope, element, attrs) {
	let defaultLabel = scope.label;
	element.bind("change", e => {
		let file = e.target.files[0];
		scope.$apply(() => {
			scope.file = file;
			scope.label = file ? file.name : defaultLabel;
			if (file) scope.url = URL.createObjectURL(file);
			else scope.url = null;
		});
	});
	scope.$watch("file", file => {
		if (!file) scope.label = defaultLabel;
	});
}
//------------------------------------------------------------------------------
// ● Factory
//------------------------------------------------------------------------------
function fileInputDirectiveFactory($filter) {
	return {
		restrict: "AE",
		scope: scope,
		link: fileInputDirectiveLink,
		template: require("./file-input.directive.html")
	};
}
//------------------------------------------------------------------------------
// ● Module
//------------------------------------------------------------------------------
export default angular
	.module("fileInput.directive", [])
	.directive("ambFileInput", fileInputDirectiveFactory).name;
