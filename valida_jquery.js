function somenteNumeros(valor){
	var temp = "";
	var comp = "0123456789";
	var i = 0;
	
	for(i = 0; i < valor.length; i++){
		if(comp.indexOf(valor.charAt(i), 0) >= 0){
			temp += valor.charAt(i);
		}
	}
	
	return temp;
}

function validarMat(Mat) {
	// Verifica se o campo é nulo
	if (matricula == '') {		
		return true;
	}
}

function validarDataBR(data){
	if(data.indexOf("_") < 0){
		var campos = data.split("/");
		var dia = eval(campos[0]);
		var mes = eval(campos[1]);
		var ano = eval(campos[2]);
	
		var teste = new Date(ano, mes - 1, dia, 12, 0, 0, 0);		
		
		if((teste.getDate() == dia) && ((teste.getMonth() + 1) == mes) && (teste.getFullYear() == ano)){
			
			var hoje = new Date();
			hoje_dia = hoje.getDate();
			hoje_mes = hoje.getMonth() + 1;
			hoje_ano = hoje.getFullYear();
			
			if(hoje_dia < 10){
				hoje_dia = "0" + hoje_dia;
			}
			if(hoje_mes < 10){
				hoje_mes = "0" + hoje_mes;
			}
			hoje_texto = eval(hoje_ano + "" + hoje_mes + "" + hoje_dia + "");
			data_texto = eval(campos[2] + campos[1] + campos[0] + "");	
			
			//alert(hoje_texto + " - " + data_texto);
			if(ano > 1900){
				if(data_texto >= hoje_texto){
					return false;
				}else{
					return true;
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	return false;
}

function ajeitaString(texto){
	texto = texto.replace("  "," ");
	var expReg = /[áãâàªää]/gi;
	texto = texto.replace(expReg,"a");
	expReg = /[éèêë]/gi;
	texto = texto.replace(expReg,"e");
	expReg = /[íîìï]/gi;
	texto = texto.replace(expReg,"i");
	expReg = /[óôõòºö]/gi;
	texto = texto.replace(expReg,"o");
	expReg = /[úùûü]/gi;
	texto = texto.replace(expReg,"u");
	expReg = /[ç]/gi;
	texto = texto.replace(expReg,"c");
	expReg = /[']/gi;
	texto = texto.replace(expReg," ");
	return texto.toUpperCase();
}

$(document).ready(function(){
	validacao_form();
});

function validacao_form(){
						   
	// METODOS AUXILIARES DE VALIDACAO
	$.validator.addMethod("comboboxes", 
		function(value, element, parameters) {			
			if(jQuery.trim(parameters) != jQuery.trim(value)){
				return true;
			}
			return false; 
		}, "Selecione um item");

	$.validator.addMethod("valida_data_br", 
		function(value, element, parameters) {
			return validarDataBR(jQuery.trim(value)); 			
		}, "Data inv&aacute;lida");

	// VALIDA FORMULARIO DE INSCRICAO
	$("#frmPrestContas").validate({ // VALIDA O FORMULARIO PRINCIPAL
		rules: {
			txtNome:{
				required: true,
				maxlength: 150,
				pattern: /(\D{3,}){2,}/
			},		
			txtMat:{
				required: true,
				maxlength: 5,
				pattern: /(\D{3,}){2,}/
			},		
			optResp:{
				required: true
			}
		},
		messages: { // MENSAGENS PERSONALIZADAS DE ERRO
			// DADOS DA PAGINA INICIAL
			
			txtNome:{
				required: "Obrigat&oacute;rio",
				maxlength: $.validator.format("M&aacute;ximo de {0} caracteres"),
				pattern: "Valor inv&aacute;lido"
			},		
			txtMat: {
				required: "Obrigat&oacute;rio",
				valida_cpf: "CPF inv&aacute;lido"
			},	
			txtCargo:{
				required: "Obrigat&oacute;rio",
				maxlength: $.validator.format("M&aacute;ximo de {0} caracteres")
			},		
			dep: {
				comboboxes: "Obrigat&oacute;rio"
			},
			txtNomeEscola:{
				required: "Obrigat&oacute;rio",
				maxlength: $.validator.format("M&aacute;ximo de {0} caracteres"),
				pattern: "Valor inv&aacute;lido"
			},		
			optResp:{
				required: "Obrigat&oacute;rio"
			}			
		},
		errorClass: "text-danger small",
		errorPlacement: function(error, element) {
			var id = $(element).attr("id");
			error.insertAfter("label[for='" + id + "']");
			$("<span>&nbsp;</span>").insertBefore(error);
		},
		highlight: function (element, errorClass) {
			$(element).addClass('erro_borda');			
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass('erro_borda');
        },
		submitHandler: function(form) {			
			document.frmMaratona.submit();			
		}
	});	
	
	// VALIDA FORMULARIO DE INSCRICAO
	$("#frmConfirmacao").validate({ // VALIDA O FORMULARIO PRINCIPAL
		rules: {
			txtNome:{
				required: true,
				maxlength: 150,
				pattern: /(\D{3,}){2,}/
			},		
			txtCPF: {
				required: true,
				valida_cpf: true
			}/*,	
			txtEmail: {				
				required: true,
				maxlength: 90,
				email: true
			}*/
		},
		messages: { // MENSAGENS PERSONALIZADAS DE ERRO
			// DADOS DA PAGINA INICIAL
			
			txtNome:{
				required: "Obrigat&oacute;rio",
				maxlength: $.validator.format("M&aacute;ximo de {0} caracteres"),
				pattern: "Valor inv&aacute;lido"
			},		
			txtCPF: {
				required: "Obrigat&oacute;rio",
				valida_cpf: "CPF inv&aacute;lido"
			}/*,	
			txtEmail: {				
				required: "Obrigat&oacute;rio",
				maxlength: $.validator.format("M&aacute;ximo de {0} caracteres"),
				email: "E-mail inv&aacute;lido"
			}*/
		},
		errorClass: "text-danger small",
		errorPlacement: function(error, element) {
			var id = $(element).attr("id");
			error.insertAfter("label[for='" + id + "']");
			$("<span>&nbsp;</span>").insertBefore(error);
		},
		highlight: function (element, errorClass) {
			$(element).addClass('erro_borda');			
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass('erro_borda');
        },
		submitHandler: function(form) {			
			form.submit();			
		}
	});	
//});