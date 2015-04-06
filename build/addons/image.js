module.exports=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},o=n(4),i=r(o),a=n(12),s=r(a),u=n(1),c=r(u);n(36);var l=c.createClass({displayName:"Image",propTypes:{content:c.PropTypes.object.isRequired,onChange:c.PropTypes.func.isRequired},getDefaultProps:function(){return{content:{src:""}}},render:function(){var t=this.props.content.src;return c.createElement("div",{className:"col-img"},c.createElement(s,this.props.content),c.createElement("fieldset",{className:"col-img-fieldset"},c.createElement(i,{label:"Image Source",type:"url",value:t,name:"image_src",onChange:this._onSrcChange})))},_onSrcChange:function(t){this.props.onChange({src:t.currentTarget.value})},_onCaptionChange:function(t){this.props.onChange({caption:t.currentTarget.value})},_onAttributionChange:function(t){this.props.onChange({attribution:t.currentTarget.value})}});t.exports=l},1:function(t,e,n){t.exports=require("react")},4:function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},o=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=n(1),s=r(a);n(6),t.exports=s.createClass({displayName:"field",getDefaultProps:function(){return{type:"text"}},render:function(){var t=this.props,e=t.label,n=t.name,r=t.type,a=o(t,["label","name","type"]);return s.createElement("div",{className:"col-field"},s.createElement("label",{className:"col-field-label",htmlFor:n||this.props.id},e),s.createElement("input",i({className:"col-field-input",type:r},a,{name:n||this.props.id})))}})},6:function(t,e,n){},12:function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},o=n(1),i=r(o),a=i.createClass({displayName:"Graphic",render:function(){var t=this.props.src;return t?i.createElement("figure",{className:"col-img-figure"},i.createElement("img",{className:"col-img-graphic",src:t,alt:""})):null}});t.exports=a},36:function(t,e,n){}});
//# sourceMappingURL=image.js.map