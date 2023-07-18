window.Bizweb||(window.Bizweb={}),Bizweb.mediaDomainName="//bizweb.dktcdn.net/",Bizweb.each=function(e,t){for(var i=0;i<e.length;i++)t(e[i],i)},Bizweb.getClass=function(e){return Object.prototype.toString.call(e).slice(8,-1)},Bizweb.map=function(e,t){for(var i=[],n=0;n<e.length;n++)i.push(t(e[n],n));return i},Bizweb.arrayContains=function(e,t){for(var i=0;i<e.length;i++)if(e[i]==t)return!0;return!1},Bizweb.distinct=function(e){for(var t=[],i=0;i<e.length;i++)Bizweb.arrayContains(t,e[i])||t.push(e[i]);return t},Bizweb.getUrlParameter=function(e){var t=RegExp("[?&]"+e+"=([^&]*)").exec(window.location.search);return t&&decodeURIComponent(t[1].replace(/\+/g," "))},Bizweb.uniq=function(e){for(var t=[],i=0;i<e.length;i++)Bizweb.arrayIncludes(t,e[i])||t.push(e[i]);return t},Bizweb.arrayIncludes=function(e,t){for(var i=0;i<e.length;i++)if(e[i]==t)return!0;return!1},Bizweb.Product=function(){function e(e){if(void 0!==e)for(property in e)this[property]=e[property]}return e.prototype.optionNames=function(){return"Array"==Bizweb.getClass(this.options)?this.options:[]},e.prototype.optionValues=function(e){if(void 0===this.variants)return null;var t=Bizweb.map(this.variants,(function(t){var i="option"+(e+1);return void 0===t[i]?null:t[i]}));return null==t[0]?null:Bizweb.distinct(t)},e.prototype.getVariant=function(e){var t=null;return e.length!=this.options.length?null:(Bizweb.each(this.variants,(function(i){for(var n=!0,r=0;r<e.length;r++){i["option"+(r+1)]!=e[r]&&(n=!1)}n&&(t=i)})),t)},e.prototype.getVariantById=function(e){for(var t=0;t<this.variants.length;t++){var i=this.variants[t];if(i.id==e)return i}return null},e.name="Product",e}(),Bizweb.money_format="{{amount}} VND",Bizweb.formatMoney=function(e,t){"string"==typeof e&&(e=(e=e.replace(/\./g,"")).replace(/\,/g,""));var i="",n=/\{\{\s*(\w+)\s*\}\}/,r=t||this.money_format;function o(e,t,i,n){if(void 0===t&&(t=2),void 0===i&&(i="."),void 0===n&&(n=","),void 0===e||null==e)return 0;var r=(e=e.toFixed(t)).split(".");return r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+i)+(r[1]?n+r[1]:"")}switch(r.match(n)[1]){case"amount":i=o(e,2);break;case"amount_no_decimals":i=o(e,0);break;case"amount_with_comma_separator":i=o(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":i=o(e,0,".",",")}return r.replace(n,i)},Bizweb.OptionSelectors=function(){function e(e,t){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.selectors=[],this.domIdPrefix=e,this.product=new Bizweb.Product(t.product),void 0!==t.onVariantSelected?this.onVariantSelected=t.onVariantSelected:this.onVariantSelected=function(){},this.replaceSelector(e),this.initDropdown(),!0}return e.prototype.replaceSelector=function(e){var t=document.getElementById(e),i=t.parentNode;Bizweb.each(this.buildSelectors(),(function(e){i.insertBefore(e,t)})),t.style.display="none",this.variantIdField=t},e.prototype.buildSelectors=function(){for(var e=0;e<this.product.optionNames().length;e++){var t=new Bizweb.SingleOptionSelector(this,e,this.product.optionNames()[e],this.product.optionValues(e));t.element.disabled=!1,this.selectors.push(t)}var i=this.selectorDivClass,n=this.product.optionNames();return Bizweb.map(this.selectors,(function(e){var t=document.createElement("div");if(t.setAttribute("class",i),n.length>1){var r=document.createElement("label");r.htmlFor=e.element.id,r.innerHTML=e.name,t.appendChild(r)}return t.appendChild(e.element),t}))},e.prototype.initDropdown=function(){var e={initialLoad:!0};if(!this.selectVariantFromDropdown(e)){var t=this;setTimeout((function(){t.selectVariantFromParams(e)||t.selectors[0].element.onchange(e)}))}},e.prototype.selectVariantFromDropdown=function(e){var t=document.getElementById(this.domIdPrefix).querySelector("[selected]");return!!t&&this.selectVariant(t.value,e)},e.prototype.selectVariantFromParams=function(e){var t=Bizweb.getUrlParameter("variantid");return null==t&&(t=Bizweb.getUrlParameter("variantId")),this.selectVariant(t,e)},e.prototype.selectVariant=function(e,t){var i=this.product.getVariantById(e);if(null==i)return!1;for(var n=0;n<this.selectors.length;n++){var r=this.selectors[n].element,o=i[r.getAttribute("data-option")];null!=o&&this.optionExistInSelect(r,o)&&(r.value=o)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",t):this.selectors[0].element.onchange(t),!0},e.prototype.optionExistInSelect=function(e,t){for(var i=0;i<e.options.length;i++)if(e.options[i].value==t)return!0},e.prototype.updateSelectors=function(e,t){var i=this.selectedValues(),n=this.product.getVariant(i);n?(this.variantIdField.disabled=!1,this.variantIdField.value=n.id):this.variantIdField.disabled=!0,this.onVariantSelected(n,this,t),null!=this.historyState&&this.historyState.onVariantChange(n,this,t)},e.prototype.selectedValues=function(){for(var e=[],t=0;t<this.selectors.length;t++){var i=this.selectors[t].element.value;e.push(i)}return e},e.name="OptionSelectors",e}(),Bizweb.SingleOptionSelector=function(e,t,i,n){this.multiSelector=e,this.values=n,this.index=t,this.name=i,this.element=document.createElement("select");for(var r=0;r<n.length;r++){var o=document.createElement("option");o.value=n[r],o.innerHTML=n[r],this.element.appendChild(o)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(t+1)),this.element.id=e.domIdPrefix+"-option-"+t,this.element.onchange=function(i,n){n=n||{},e.updateSelectors(t,n)},!0},Bizweb.Image={preload:function(e,t){for(var i=0;i<e.length;i++){var n=e[i];this.loadImage(this.getSizedImageUrl(n,t))}},loadImage:function(e){(new Image).src=e},switchImage:function(e,t,i){if(e&&t){var n=this.imageSize(t.src),r=this.getSizedImageUrl(e.src,n);i?i(r,e,t):t.src=r}},imageSize:function(e){var t=e.match(/thumb\/(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\//);return null!=t?t[1]:null},getSizedImageUrl:function(e,t){if(null==t)return e;if("master"==t)return this.removeProtocol(e);if(null!=e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i)){var i=Bizweb.mediaDomainName+"thumb/"+t+"/";return this.removeProtocol(e).replace(Bizweb.mediaDomainName,i).split("?")[0]}return null},removeProtocol:function(e){return e.replace(/http(s)?:/,"")}};