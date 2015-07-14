/*
 * Validation features
 * @package PeepSo
 * @author PeepSo
 *///$PeepSo.log("validate-1.5.js");
/**
 * @returns {cValidate}
 */function cValidate(){this.message="";this.REM="info is required. Make sure it contains a valid value!";this.noticeTitle="Notice";this.errorField=new Array;this.customMessage="";this.JOINTEXT=",";this.init=function(){jQuery("#peepso-wrap form.peepso-form-validate :input.required").blur(function(){!jQuery(this).hasClass("validate-custom-date")&&!jQuery(this).hasClass("validate-country")&&(cvalidate.validateElement(this)?cvalidate.markValid(this):cvalidate.markInvalid(this))});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-profile-email").blur(function(){jQuery.trim(jQuery(this).val())!==""&&(cvalidate.validateElement(this)?cvalidate.markValid(this):cvalidate.markInvalid(this))});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-profile-url").blur(function(){jQuery.trim(jQuery(this).val())!==""&&(cvalidate.validateElement(this)?cvalidate.markValid(this):cvalidate.markInvalid(this))});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-country").change(function(){jQuery(this).hasClass("required")&&(cvalidate.validateElement(this)?cvalidate.markValid(this):cvalidate.markInvalid(this))});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-custom-date").blur(function(){cvalidate.validateElement(this)?cvalidate.markValid(this):cvalidate.markInvalid(this)});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-custom-date").keydown(function(e){if(e.keyCode===46||e.keyCode===8||e.keyCode===9||e.keyCode===27||e.keyCode===13||e.keyCode===65&&e.ctrlKey===!0||e.keyCode>=35&&e.keyCode<=39)return;(e.shiftKey||(e.keyCode<48||e.keyCode>57)&&(e.keyCode<96||e.keyCode>105))&&e.preventDefault()});jQuery("#peepso-wrap form.peepso-form-validate :input.validateSubmit").click(function(){if(cvalidate.validateForm())return!0;var e=cvalidate.REM==="undefined"||cvalidate.REM===""?"info is required. Make sure it contains a valid value!":cvalidate.REM;if(cvalidate.errorField.length>1){lastField=cvalidate.errorField.pop();jQuery(cvalidate.errorField).each(function(t,n){cvalidate.errorField[t]=n+" "+e});strErrField=cvalidate.errorField.join("<br />")+"<br />"+lastField+" "+e}else strErrField=cvalidate.errorField;e=strErrField;cvalidate.customMessage!==""&&(e=cvalidate.customMessage);if(jQuery("#tnc").hasClass("required")&&cvalidate.errorField.length<1){var t=jQuery("#tnc:checked").val(),e=jQuery("#tnc").data("message");e=t!=="Y"?e:cvalidate.REM}if(typeof e=="string"){e=e.replace(/\n/g,"");e=e.replace("'","\\'")}jQuery("#peepso-wrap form.peepso-form-validate :input.required[value='']").each(function(e){cvalidate.markInvalid(this)});return!1})};this.setMaxLength=function(e,t){jQuery(e).keyup(function(){var e=parseInt(t);jQuery(this).val().length>e&&jQuery(this).val(jQuery(this).val().substr(0,t))})};this.markInvalid=function(e){var t=e.name;if(jQuery(e).hasClass("validate-custom-date")){jQuery("#peepso-wrap form.peepso-form-validate input[name='"+t+"']").addClass("invalid");jQuery("#peepso-wrap form.peepso-form-validate select[name='"+t+"']").addClass("invalid")}else jQuery(e).addClass("invalid")};this.markValid=function(e){var t=e.name;if(jQuery(e).hasClass("validate-custom-date")){jQuery("#peepso-wrap form.peepso-form-validate input[name='"+t+"']").removeClass("invalid");jQuery("#peepso-wrap form.peepso-form-validate select[name='"+t+"']").removeClass("invalid")}else jQuery(e).removeClass("invalid");if(t!==null){t=t.replace("[]","");jQuery("#err"+t+"msg").hide();jQuery("#err"+t+"msg").html("&nbsp")}};this.validateElement=function(e){var t=!0,n=e.name,r=jQuery(e).attr("type"),i=jQuery.trim(jQuery(e).val());if(r==="text"||r==="password"||jQuery(e).is("textarea"))if(i===""){if(jQuery(e).hasClass("required")){t=!1;n=n.replace("[]","");lblName=jQuery("#lbl"+n).html();lblName===null?lblName="Field":lblName=lblName.replace("*","");this.setMessage(n,lblName,"COM_COMMUNITY_REGISTER_INVALID_VALUE")}}else{if(jQuery(e).hasClass("validate-name"))if(jQuery(e).val().length<3){this.setMessage(n,"","COM_COMMUNITY_NAME_TOO_SHORT");t=!1}else{jQuery("#err"+n+"msg").hide();jQuery("#err"+n+"msg").html("&nbsp");t=!0}jQuery(e).hasClass("validate-username")&&jQuery("#usernamepass").val()!==jQuery(e).val()&&(t=cvalidate.ajaxValidateUserName(jQuery(e)));if(jQuery(e).hasClass("validate-email")){regex=/^([*+!.&#$¦\'\\%\/0-9a-z^_`{}=?~:-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,4})$/i;t=regex.test(jQuery(e).val());if(t===!1)this.setMessage(n,"","COM_COMMUNITY_INVALID_EMAIL");else{jQuery("#err"+n+"msg").hide();jQuery("#err"+n+"msg").html("&nbsp");jQuery("#emailpass").val()!==jQuery(e).val()&&(t=cvalidate.ajaxValidateEmail(jQuery(e)))}}if(jQuery(e).hasClass("validate-profile-email")){regex=/^([*+!.&#$¦\'\\%\/0-9a-z^_`{}=?~:-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,6})$/i;t=regex.test(jQuery(e).val());if(t===!1)this.setMessage(n,"","COM_COMMUNITY_INVALID_EMAIL");else{jQuery("#err"+n+"msg").hide();jQuery("#err"+n+"msg").html("&nbsp")}}if(jQuery(e).hasClass("validate-profile-url")){var s=jQuery(e).val();if(s.match("http://")){s=s.replace("http://","");jQuery(e).prev("select").find("option").removeAttr("selected").filter('[value="http://"]').attr("selected","selected")}if(s.match("https://")){s=s.replace("https://","");jQuery(e).prev("select").find("option").removeAttr("selected").filter('[value="https://"]').attr("selected","selected")}jQuery(e).val(s);n=n.replace("[]","");regex=/^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;t=regex.test(jQuery(e).val());if(t===!1)this.setMessage(n,"","COM_COMMUNITY_INVALID_URL");else{jQuery("#err"+n+"msg").hide();jQuery("#err"+n+"msg").html("&nbsp")}}if(jQuery(e).hasClass("validate-password")&&e.name==="jspassword")if(jQuery(e).val().length<6){this.setMessage(n,"","COM_COMMUNITY_PASSWORD_TOO_SHORT");t=!1}else{jQuery("#err"+n+"msg").hide();jQuery("#err"+n+"msg").html("&nbsp");t=!0}if(jQuery(e).hasClass("validate-passverify")&&e.name==="jspassword2"){t=jQuery("#jspassword").val()===jQuery(e).val();if(t===!1){var o=jQuery("input[name=task]").val();o==="register_save"?this.setMessage("jspassword2","","COM_COMMUNITY_REGISTER_PASSWORD_NOT_SAME"):this.setMessage("jspassword2","","COM_COMMUNITY_PASSWORD_NOT_SAME")}else{jQuery("#errjspassword2msg").hide();jQuery("#errjspassword2msg").html("&nbsp")}}jQuery(e).hasClass("validate-custom-date")&&(t=this.checkCustomDate(e))}else if(jQuery(e).attr("type")==="checkbox")if(jQuery(e).hasClass("validate-custom-checkbox")){jQuery("#peepso-wrap form.peepso-form-validate input[name='"+n+"']:checked").size()===0&&(t=!1);if(t===!1){n=n.replace("[]","");lblName=jQuery("#lbl"+n).html();lblName===null?lblName="Field":lblName=lblName.replace("*","");this.setMessage(n,lblName,"COM_COMMUNITY_REGISTER_INVALID_VALUE")}}else jQuery(e).attr("checked")||(t=!1);else if(jQuery(e).attr("type")==="radio")if(jQuery(e).hasClass("validate-custom-radio")){jQuery("#peepso-wrap form.peepso-form-validate input[name='"+n+"']:checked").size()===0&&(t=!1);if(t===!1){lblName=jQuery("#lbl"+n).html();lblName===null?lblName="Field":lblName=lblName.replace("*","");this.setMessage(n,lblName,"COM_COMMUNITY_REGISTER_INVALID_VALUE")}}else jQuery(e).attr("checked")||(t=!1);else if(jQuery(e).is("select")){jQuery(e).children(":selected").length===0?t=!1:jQuery(e).children(":selected").each(function(){jQuery(e).val()===""&&(t=!1)});jQuery(e).hasClass("validate-country")&&jQuery(e).val()==="selectcountry"&&(t=!1);if(jQuery(e).hasClass("validate-custom-date"))t=this.checkCustomDate(e);else if(t===!1){n=n.replace("[]","");lblName=jQuery("#lbl"+n).html();lblName===null?lblName="Field":lblName=lblName.replace("*","");this.setMessage(n,lblName,"COM_COMMUNITY_REGISTER_INVALID_VALUE")}}else if(jQuery(e).attr("type")==="select-multiple"){jQuery(e).children(":selected").length===0&&(t=!1);if(t===!1){n=n.replace("[]","");lblName=jQuery("#lbl"+n).html();lblName===null?lblName="Field":lblName=lblName.replace("*","");this.setMessage(n,lblName,"COM_COMMUNITY_REGISTER_INVALID_VALUE")}}return t};this.validateForm=function(){var e=!0;this.errorField=new Array;jQuery("#peepso-wrap form.peepso-form-validate :input.required").each(function(){cvalidate.validateElement(this)||(e=!1)});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-profile-email").each(function(){jQuery.trim(jQuery(this).val())!==""&&(cvalidate.validateElement(this)||(e=!1))});jQuery("#peepso-wrap form.peepso-form-validate :input[class*=minmax]").each(function(){if(this.className.indexOf("minmax")>-1){var t=jQuery(this).attr("class").split(" ");for(var n=0;n<t.length;n++)if(t[n].indexOf("minmax")===0){var r=t[n].split("_")[1],i=t[n].split("_")[2],s=jQuery.trim(jQuery(this).val()).length;if(!(s>=r&&s<=i)){cvalidate.setMessage(jQuery(this).attr("id"),"","COM_COMMUNITY_REGISTER_INVALID_CHAR_COUNT",r,i);e=!1}break}}});jQuery("#peepso-wrap form.peepso-form-validate :input.validate-profile-url").each(function(){jQuery.trim(jQuery(this).val())!==""&&(cvalidate.validateElement(this)||(e=!1))});return e};this.ajaxValidateUserName=function(e){jax.call("community","register,ajaxCheckUserName",jQuery(e).val())};this.ajaxValidateEmail=function(e){jax.call("community","register,ajaxCheckEmail",jQuery(e).val())};this.checkCustomDate=function(el){var isValid=!0,fieldName=el.name;if(jQuery(el).hasClass("validate-custom-date")){fieldId=fieldName.replace("[]","");var dateObj=jQuery("#peepso-wrap form.peepso-form-validate input[name='"+fieldName+"']");for(var i=0;i<dateObj.length;i++)/^-?\d+$/.test(dateObj[i].value)||(isValid=!1);var dateObj2=jQuery("#peepso-wrap form.peepso-form-validate select[name='"+fieldName+"']"),dd=dateObj[0].value,mm=dateObj2[0].value,yy=dateObj[1].value,dayobj=new Date(yy,eval(mm-1),dd);if(dayobj.getMonth()+1!==mm||dayobj.getDate()!==dd||dayobj.getFullYear()!==yy)isValid=!1;if(isValid===!1)this.setMessage(fieldId,"","COM_COMMUNITY_INVALID_DATE");else{jQuery("#err"+fieldId+"msg").hide();jQuery("#err"+fieldId+"msg").html("&nbsp")}}return isValid};this.setMessage=function(e,t,n,r,i){if(jQuery('label[for="'+e+'"]').length<0)return;if(typeof jQuery('label[for="'+e+'"]').html()==typeof undefined)return;errorLabel=jQuery('label[for="'+e+'"]').html().replace("*","");jQuery.inArray(errorLabel,this.errorField)===-1&&this.errorField.push(errorLabel);jax.call("community","register,ajaxSetMessage",e,t,n,r,i)};this.setSystemText=function(key,text){eval("cvalidate."+key+' = "'+text+'"')}}var cvalidate=new cValidate;(function(e){var t=new function(){this.countRegexp=function(e,t){var n=e.match(t);return n?n.length:0};this.getStrength=function(e,t){var n=e.length;if(n<t)return 0;var r=this.countRegexp(e,/\d/g),i=this.countRegexp(e,/[a-z]/g),s=this.countRegexp(e,/[A-Z]/g),o=n-r-i-s;if(r===n||i===n||s===n||o===n)return 1;var u=0;r&&(u+=2);i&&(u+=s?4:3);s&&(u+=i?4:3);o&&(u+=5);n>10&&(u+=1);return u};this.getStrengthLevel=function(e,t){var n=this.getStrength(e,t);switch(!0){case n<=0:return 1;case n>0&&n<=4:return 2;case n>4&&n<=8:return 3;case n>8&&n<=12:return 4;case n>12:return 5}return 1}};e.fn.password_strength=function(n){var r=e.extend({container:null,minLength:6,texts:{1:"Too weak",2:"Weak password",3:"Normal strength",4:"Strong password",5:"Very strong password"}},n);return this.each(function(){if(r.container)var n=e(r.container);else{var n=e("<span/>").attr("class","jsPasswordStrength");e(this).after(n)}e(this).keyup(function(){var i=e(this).val();if(i.length>0){var s=t.getStrengthLevel(i,r.minLength),o="jsPasswordStrength_"+s;if(!n.hasClass(o)&&s in r.texts){n.text(r.texts[s]).attr("class","jsPasswordStrength "+o);s===1?e("#btnSubmit").attr("disabled",!0):e("#btnSubmit").attr("disabled",!1)}}else n.text("").attr("class","jsPasswordStrength")})})}})(jQuery);