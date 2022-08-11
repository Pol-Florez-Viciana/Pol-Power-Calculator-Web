// Modulo Pol-Calculator.js **********************************************************************************************
// ***********************************************************************************************************************
// ***********************************************************************************************************************
// Día Creación 14/12/2021 - Hasta - 08/07/2022 ** Autor: Pol Flórez Viciana *********************************************
// Fecha Publicado ON-LINE 19/12/2021 - Hasta - 08/07/2022 ***************************************************************
// ***********************************************************************************************************************
// Constantes de Uso Reiterado
const StringNullString = ""; 
const StringComa = ",";
const StringGuion = "-";
const StringLetraE = "E";
const StringPunto = ".";
const StringPI = "3,1415926535897932384626433832795";
const StringEuler = "2,7182818284590452353602874713526";

// Constantes de Numeros en Strings
const StringCero = StringNullString + "0";
const StringUno = StringNullString + "1";
const StringDos = StringNullString + "2";
const StringTres = StringNullString + "3";
const StringCuatro = StringNullString + "4";
const StringCinco = StringNullString + "5";
const StringSeis = StringNullString + "6";
const StringSiete = StringNullString + "7";
const StringOcho = StringNullString + "8";
const StringNueve = StringNullString + "9";
const StringDiez = StringNullString + "10";
const StringDieziSeis = StringNullString + "16";
const StringTreintaiDos = StringNullString + "32";

// Constantes de Numeros
const Cero = 0;
const Uno = 1;
const Dos = 2;
const Tres = 3;
const Cuatro = 4;
const Cinco = 5;
const Seis = 6;
const Siete = 7;
const Ocho = 8;
const Nueve = 9;
const Diez = 10;
const DieziSeis = 16;
const TreintaiDos = 32;

// Funciones de Redondeo 
function RoundToUp(Texto){
	var Resultado = StringCero;
	if (IsNegativeAndNumber(Texto) == true || IsNumber(Texto) == true){
		var Num1 = Texto;
		var EsNegativo = false;
		if ( IsNegativeAndNumber(Texto) == true){
			Num1 = ConvertPositive(Texto);
			EsNegativo = true;
		}
		if (IsRealNumber(Num1) == true ){
			var Largada = GetDecimalPart(Num1);
			var Longitud = Largada.length + Uno;
			var NumeroSuma = StringsCerosToRight(StringCero + StringComa , parseInt(Longitud)) + StringUno;
			Resultado = SumaSignos(Num1,NumeroSuma);
		}else{
			Resultado = SumaSignos(Num1, StringUno);
		}
	}
	if (EsNegativo == false){
		return Resultado;
	}else{
		return StringGuion + Resultado;
	}	
	
}
function RoundToDown(Texto){
	var Resultado = StringCero;
	if (IsNegativeAndNumber(Texto) == true || IsNumber(Texto) == true){
		var Num1 = Texto;
		var EsNegativo = false;
		if ( IsNegativeAndNumber(Texto) == true){
			Num1 = ConvertPositive(Texto);
			EsNegativo = true;
		}
		if (IsRealNumber(Num1) == true ){
			var Largada = GetDecimalPart(Num1);
			var Longitud = Largada.length + Uno;
			var NumeroResta = StringsCerosToRight(StringCero + StringComa , parseInt(Longitud)) + StringUno;
			Resultado = RestaSignos(Num1,NumeroResta);
		}else{
			Resultado = RestaSignos(Num1, StringUno);
		}
	}
	if (EsNegativo == false){
		return Resultado;
	}else{
		if(IsNegativeAndNumber(Resultado) == false){
			return StringGuion + Resultado;
		}else{
			return Resultado;
		}
	}	
}
// Funciones de Formateo de Puntos
function CreatePointsMilesNumber(Texto){
	var EsNum = false;
	var EsNegativo = false;
	var Resultado = StringNullString;
	var ElNumero = StringNullString;
	if (IsNegativeAndNumber(Texto) == true ){
		EsNum = true;
		EsNegativo = true;
		ElNumero = ConvertPositive(Texto);
	}else{
		if (IsNumber(Texto) == true ){
			EsNum = true;
			EsNegativo = false;
			ElNumero = Texto;
		}	
	}
	if (EsNum == true && ElNumero.length >= Uno ){
		var SubResultado = StringNullString;
		if (IsRealNumber(ElNumero) == true ){
			var ParteEntera = GetIntegerPart(ElNumero);
			var ParteDecimal = GetDecimalPart(ElNumero);
			var i;
			var Cuenta = Uno;
			var Tempo = StringNullString + ParteEntera;
			for (i=Uno; i <= ParteEntera.length ; i++){
				var T = StringsRight(Tempo,Uno);
				if (Cuenta == Tres && i != ParteEntera.length){
					Cuenta = Uno;
					SubResultado = StringPunto + T + SubResultado;
				}else{
					Cuenta++;
					SubResultado = T + SubResultado;
				}
				Tempo = StringsLeft(ParteEntera, ParteEntera.length - i);	
			}
			Resultado = SubResultado + StringComa + ParteDecimal;
		}else{
			var ParteEntera = ElNumero;
			var i;
			var Cuenta = Uno;
			var Tempo = StringNullString + ParteEntera;
			for (i=Uno; i <= ParteEntera.length ; i++){
				var T = StringsRight(Tempo,Uno);
				if (Cuenta == Tres && i != ParteEntera.length){
					Cuenta = Uno;
					SubResultado = StringPunto + T + SubResultado;
				}else{
					Cuenta++;
					SubResultado = T + SubResultado;
				}
				Tempo = StringsLeft(ParteEntera, ParteEntera.length - i);	
			}
			Resultado = SubResultado;
		}	
	}
	if (Resultado != StringNullString){
		if (EsNegativo == true ){
			return StringGuion + Resultado;
		}else{
			return Resultado;	
		}
	}else{
		Resultado = Texto;
		return Resultado;
	}
}
function DeleteOrHidePoints(Texto){
	if (Texto == StringNullString){
		Texto = StringPunto;
	}
	var i;
	var Resultado = Texto;
	for (i = Uno; i <= Texto.length; i++){
		Resultado = Resultado.replace(StringPunto,StringNullString);
	}
	return Resultado;
}

// Funciones de Conversion de Base a Decimal Octal y Hexadecimal
function GetHexadecimalsSimbol(Texto){
	if (parseInt(Texto) == Cero ){
		return "0";
	}
	if (parseInt(Texto) == Uno ){
		return "1";
	}
	if (parseInt(Texto) == Dos ){
		return "2";
	}
	if (parseInt(Texto) == Tres ){
		return "3";
	}
	if (parseInt(Texto) == Cuatro ){
		return "4";
	}
	if (parseInt(Texto) == Cinco ){
		return "5";
	}
	if (parseInt(Texto) == Seis ){
		return "6";
	}
	if (parseInt(Texto) == Siete ){
		return "7";
	}
	if (parseInt(Texto) == Ocho ){
		return "8";
	}
	if (parseInt(Texto) == Nueve ){
		return "9";
	}
	if (parseInt(Texto) == Diez ){
		return "A";
	}
	if (parseInt(Texto) == 11 ){
		return "B";
	}
	if (parseInt(Texto) == 12 ){
		return "C";
	}
	if (parseInt(Texto) == 13 ){
		return "D";
	}
	if (parseInt(Texto) == 14 ){
		return "E";
	}
	if (parseInt(Texto) == 15 ){
		return "F";
	}
}
function GetHexadecimalBinary(Texto){
	if (parseInt(Texto) == Cero ){
		return "0000";
	}
	if (parseInt(Texto) == Uno ){
		return "0001";
	}
	if (parseInt(Texto) == Dos ){
		return "0010";
	}
	if (parseInt(Texto) == Tres ){
		return "0011";
	}
	if (parseInt(Texto) == Cuatro ){
		return "0100";
	}
	if (parseInt(Texto) == Cinco ){
		return "0101";
	}
	if (parseInt(Texto) == Seis ){
		return "0110";
	}
	if (parseInt(Texto) == Siete ){
		return "0111";
	}
	if (parseInt(Texto) == Ocho ){
		return "1000";
	}
	if (parseInt(Texto) == Nueve ){
		return "1001";
	}
	if (Texto == "A" ){
		return "1010";
	}
	if (Texto == "B" ){
		return "1011";
	}
	if (Texto == "C" ){
		return "1100";
	}
	if (Texto == "D" ){
		return "1101";
	}
	if (Texto == "E" ){
		return "1110";
	}
	if (Texto == "F" ){
		return "1111";
	}
}
function GetOctalBinary(Texto){
	if (parseInt(Texto) == Cero ){
		return "000";
	}
	if (parseInt(Texto) == Uno ){
		return "001";
	}
	if (parseInt(Texto) == Dos ){
		return "010";
	}
	if (parseInt(Texto) == Tres ){
		return "011";
	}
	if (parseInt(Texto) == Cuatro ){
		return "100";
	}
	if (parseInt(Texto) == Cinco ){
		return "101";
	}
	if (parseInt(Texto) == Seis ){
		return "110";
	}
	if (parseInt(Texto) == Siete ){
		return "111";
	}
}
function ConvertHexadecimalToInteger(Texto){
	var Resultado = StringNullString;
	if (IsHexadecimalNumber(Texto) == true ){
		var i;
		var ElNumero = StringNullString + Texto;
		for ( i = Uno; i <= Texto.length; i++){
			var T = StringsRight(ElNumero, Uno);
			var R = GetHexadecimalBinary(T);
			Resultado = StringNullString + R + Resultado;
			ElNumero = StringsLeft(Texto, Texto.length - i);
		}	
	}
	if (Resultado == StringNullString){
		Resultado = StringCero;
	}
	return ConvertBinaryToInteger(Resultado);	
}
function ConvertIntegerToHexadecimal(Texto,Reiteraciones){
	var Resultado = StringNullString;
	var Reitera = Cero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos, Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}
		if( IsNumber(Texto) == true && IsRealNumber(Texto) == false ){
			
			if(IsMayor(Texto, StringSiete) == true){
				var ElNumero = StringNullString + Texto;
				while (IsMayor(ElNumero, "15") == true ) {
					var Operativo = DivideSignos(ElNumero,StringDieziSeis,Reitera);
					var OperativoEntero = GetIntegerPart(Operativo);
					var Resta = RestaReales(ElNumero, MultiplicaReales(OperativoEntero,StringDieziSeis));
					Resultado = StringNullString + GetHexadecimalsSimbol(Resta) + Resultado;
					ElNumero = OperativoEntero;
				}
				if (IsMayor(ElNumero, StringCero) == true){
					Resultado = StringNullString + GetHexadecimalsSimbol(ElNumero) + Resultado;	
				}
			}else{
				Resultado = Texto;
			}	
		}else{
			Resultado = StringCero;
		}
	}
	return Resultado;	
}
function ConvertOctalToInteger(Texto){
	var Resultado = StringNullString;
	if (IsOctalNumber(Texto) == true ){
		var i;
		var ElNumero = StringNullString + Texto;
		for ( i = Uno; i <= Texto.length; i++){
			var T = StringsRight(ElNumero, Uno);
			var R = GetOctalBinary(T);
			Resultado = StringNullString + R + Resultado;
			ElNumero = StringsLeft(Texto, Texto.length - i);
		}	
	}	
	if (Resultado == StringNullString){
		Resultado = StringCero;
	}
	return ConvertBinaryToInteger(Resultado);
}
function ConvertIntegerToOctal(Texto,Reiteraciones){
	var Resultado = StringNullString;
	var Reitera = Cero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos, Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}
		if( IsNumber(Texto) == true && IsRealNumber(Texto) == false ){
			
			if(IsMayor(Texto, StringSiete) == true){
				var ElNumero = StringNullString + Texto;
				while (IsMayor(ElNumero, StringSiete) == true ) {
					var Operativo = DivideSignos(ElNumero,StringOcho,Reitera);
					var OperativoEntero = GetIntegerPart(Operativo);
					var Resta = RestaReales(ElNumero, MultiplicaReales(OperativoEntero,StringOcho));
					Resultado = StringNullString + Resta + Resultado;
					ElNumero = OperativoEntero;
				}
				if (IsMayor(ElNumero, StringCero) == true){
					Resultado = StringNullString + ElNumero + Resultado;	
				}
			}else{
				Resultado = Texto;
			}	
		}else{
			Resultado = StringCero;
		}
	}
	return Resultado;	
}
function ConvertBinaryToInteger(Texto){
	var Resultado = StringCero;
	if (IsBinaryNumber(Texto) == true ){
		Resultado = StringCero;
		var ElNumero = StringNullString + Texto;
		var Multiplo = StringUno;
		var i;
		for (i = Uno; i <= Texto.length; i++){
			var T = StringsRight(ElNumero,Uno);
			if (parseInt(T) == Uno){
				Resultado = SumaReales(Resultado,Multiplo);
			}
			Multiplo = MultiplicaReales(Multiplo,StringDos);
			ElNumero = StringsLeft(Texto,Texto.length - i);
		}
	}
	return Resultado;
}
function ConvertIntegerToBinary(Texto,Reiteraciones){
	var Resultado = StringNullString;
	var Reitera = Cero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos, Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}
		if( IsNumber(Texto) == true && IsRealNumber(Texto) == false ){
			
			if(IsMayor(Texto, StringCero) == true){
				var i;
				var ElNumero = StringNullString + Texto;
				while (IsMayor(ElNumero, StringCero + StringComa + StringTres) == true ) {
					var NumMOD = MODSignos(ElNumero,StringDos,Reitera);
					Resultado = StringNullString + NumMOD + Resultado;
					var Restante = DivideSignos(ElNumero,StringDos,Reitera);
					ElNumero = GetLeftNumber(Restante);
				}
			}else{
				Resultado = StringCero;
			}	
		}else{
			Resultado = StringCero;
		}
	}
	return Resultado;	
}

//Principales Funciones Finales de Uso con Signos
function ModLogPowReverse(Texto1,Texto2,Texto3,Reiterations){
	var Resultado = StringCero;
	var DivisionDeR = DivideSignos(StringUno,Texto2,Reiterations);
	Resultado = ModLogPow(Texto1,DivisionDeR,Texto3,Reiterations);
	return Resultado;
}
function PowReverse(Texto1,Texto2,Reiterations){
	var Resultado = StringCero;
	var DivisionDeR = DivideSignos(StringUno,Texto1,Reiterations);
	Resultado = ElevaSignos(DivisionDeR,Texto2,Reiterations);
	return Resultado;
}
function PowAsimetricReverse(Texto1,Texto2,Texto3,Reiterations){
	var Resultado = StringCero;
	var DivisionDeR = DivideSignos(StringUno,Texto1,Reiterations);
	Resultado = PowAsimetric(DivisionDeR,Texto2,Texto3,Reiterations);
	return Resultado;
}
function ModLogPow(Texto1,Texto2,Texto3,Reiteraciones){
	var Restacion = StringCero;
	if(IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true){
		if(IsNegativeAndNumber(Texto2) == true || IsNumber(Texto2) == true){
			if(IsNegativeAndNumber(Texto3) == true || IsNumber(Texto3) == true){
				if(IsNegativeAndNumber(Texto3) == true){
					//var SubTexto3 = StringGuion + GetIntegerPart(ConvertPositive(Texto3));
					var Elevacion = ElevaSignos(Texto2,Texto3,Reiteraciones);
					Restacion = RestaSignos(Texto1,Elevacion);
				}else{
					if(IsNumber(Texto3) == true ){
						//var SubTexto3 = GetIntegerPart(Texto3);
						var Elevacion = ElevaSignos(Texto2,Texto3,Reiteraciones);
						Restacion = RestaSignos(Texto1,Elevacion);
					}
				}
			}
		}
	}	
	return Restacion;	
}
function PowAsimetric(Texto1,Texto2,Texto3,Reiteraciones){
	var Sumacion = StringCero;
	if(IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true){
		if(IsNegativeAndNumber(Texto2) == true || IsNumber(Texto2) == true){
			if(IsNegativeAndNumber(Texto3) == true || IsNumber(Texto3) == true){
				if(IsNegativeAndNumber(Texto2) == true){
					//var SubTexto2 = StringGuion + GetIntegerPart(ConvertPositive(Texto2));
					var Elevacion = ElevaSignos(Texto1,Texto2,Reiteraciones);
					Sumacion = SumaSignos(Elevacion,Texto3);
				}else{
					if(IsNumber(Texto2) == true ){
						//var SubTexto2 = GetIntegerPart(Texto2);
						var Elevacion = ElevaSignos(Texto1,Texto2,Reiteraciones);
						Sumacion = SumaSignos(Elevacion,Texto3);
					}
				}
			}
		}	
	}	
	return Sumacion;	
}
function FactorialSignos(Texto, Reiteraciones){
	var Resultado = StringCero;
	var EsNegativo = false;
	var Reitera = Cero;
	if (IsNumber(Reiteraciones) == true ){
		if(IsMayor(StringTreintaiDos,Reiteraciones) == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}
	}
	var ElNumero = StringNullString;
	if (IsNegativeAndNumber(Texto) == true ){
		EsNegativo = true;
		ElNumero = ConvertPositive(Texto);
	}else{
		if (IsNumber(Texto) == true ){
			ElNumero = Texto;
		}	
	}
	if (IsMayor(ElNumero, StringUno + StringCero + StringCero + StringCero) == false){
		if (IsRealNumber(ElNumero) == false ){
			Resultado = FactorialIntegers(ElNumero);
		}else{
			var ParteDecimales = GetDecimalPart(ElNumero);
			var ParteEntera = GetIntegerPart(ElNumero);
			var ParteEnteraMasUno = SumaReales(ParteEntera,StringUno);
			var Factorial1 = FactorialIntegers(ParteEntera);
			var Factorial2 = FactorialIntegers(ParteEnteraMasUno);
			var Restacion = RestaReales(Factorial2,Factorial1);
			var Limite = StringsCerosToRight(StringUno, ParteDecimales.length + Uno);
			var LaParteDividida = DivideSignos(Restacion, Limite, Reitera);
			if (IsRealNumber(LaParteDividida) == true ){
				var Tempo = GetIntegerPart(LaParteDividida);
				Limite = StringsCerosToRight(StringUno, Tempo.length );
			}else{
				Limite = StringUno;
			}
			var ParteResultado = DivideSignos(ParteDecimales,Limite,Reitera);
			var PreResultado = MultiplicaReales(LaParteDividida, ParteResultado);
			Resultado = SumaReales(Factorial1,PreResultado);
		}
	}	
	if ( EsNegativo == false ){
		return Resultado;	
	}else{
		return StringGuion + Resultado;
	}
		
}
function LOGSignos(Texto1,Texto2,Reiteraciones){
	var EsNum1 = false;
	var EsNum2 = false;
	var EsNegativo1 = false;
	var EsNegativo2 = false;
	var EsIrresoluble = false;
	var MultiplicarPrimerResultado = false;
	var Reitera = StringCero;
	var Resultado = StringCero;
	if (IsNumber(Reiteraciones) == true ){
		var Num1 = StringNullString;
		var Num2 = StringNullString;
		if(IsMayor(StringTreintaiDos,Reiteraciones) == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}		
		if (IsNegativeAndNumber(Texto1) == true){
			EsNum1 = true;
			EsNegativo1 = true;
			Num1 = ConvertPositive(Texto1);	
		}else{
			if (IsNumber(Texto1) == true){
				EsNum1 = true;
				EsNegativo1 = false;
				Num1 = StringNullString + Texto1;
			}
		}
		if (IsNegativeAndNumber(Texto2) == true){
			EsNum2 = true;
			EsNegativo2 = true;
			Num2 = ConvertPositive(FormatCeros(Texto2));	
		}else{
			if (IsNumber(Texto2) == true){
				EsNum2 = true;
				EsNegativo2 = false;
				Num2 = StringNullString + FormatCeros(Texto2);
			}
		}
		if ( IsEquals(Num2,StringUno) == false){
			if (EsNum1 == true && EsNum2 == true ){
				var SubResultado = StringNullString;
				if (IsMayor(Num2, StringCero) == true ){
					//if (IsMayor(Num1,Num2) == true && IsEquals(Num1,Num2) == false ){
						var PrimerParametro = StringCero;
						var Temporal = Num1;
						if (IsMayor(Num2, StringUno) == true ){
							while (IsMayor(Num2, Temporal) == false ){
								var NewTemporal = DivideSignos(Temporal,Num2,Reitera);
								Temporal = GetIntegerPart(NewTemporal);
								PrimerParametro = SumaReales(PrimerParametro,StringUno);
							}
						}else{
							if (IsMayor(Num2, Num1) == true ){
								while (IsMayor(Num2, Temporal) == true ){
									Temporal = DivideSignos(Temporal, Num2, Reitera);
									PrimerParametro = SumaReales(PrimerParametro,StringUno);
								}
								MultiplicarPrimerResultado = true;
							}else{
								EsIrresoluble = true;
								PrimerParametro = StringUno;	
							}	
						}
						if (EsIrresoluble == false){	
							var PreResultado1 = ElevaIntegers(Num2,PrimerParametro, Reiteraciones);
							var PreResultado2 = StringNullString;	
							if (IsEquals(Num1,PreResultado1) == true){
								SubResultado = PrimerParametro;
							}else{
								if (IsMayor(PrimerParametro, StringCero + StringComa + StringNueve ) == true){
									var SegundoParametro = SumaReales(PrimerParametro,StringUno);
									PreResultado2 = ElevaIntegers(Num2,SegundoParametro, Reiteraciones);
									if (MultiplicarPrimerResultado == true ){		
										var Resta1 = RestaSignos(PreResultado1,PreResultado2);
										var Resta2 = RestaSignos(Num1,PreResultado2);
										var TempoDivision = DivideSignos(Resta2,Resta1,Reitera);
										//var Resta3 = DivideSignos(TempoDivision,Num2,Reitera);
										var SubResta3 = RestaSignos(StringUno,TempoDivision);
										//SubResultado = SumaSignos(PrimerParametro,SubResta3);
										SubResultado = SumaSignos(PrimerParametro,SubResta3);
									}else{
										var Resta1 = RestaSignos(PreResultado2,PreResultado1);
										var Resta2 = RestaSignos(PreResultado2,Num1);
										var TempoDivision = DivideSignos(Resta2,Resta1,Reitera);
										var Resta3 = RestaSignos(StringUno,TempoDivision);
										SubResultado = SumaSignos(PrimerParametro,Resta3);
									}	
								}else{
									SubResultado = DivideSignos(Num1,Num2,Reitera);
								}
							}
						}else{
							//var PreResultado1 = ElevaIntegers(Num2,PrimerParametro);
							//var SegundoParametro = SumaReales(PrimerParametro,StringUno);
							//var PreResultado2 = ElevaIntegers(Num2,SegundoParametro);;
							//var Resta1 = RestaSignos(PreResultado2,PreResultado1);
							//var Resta2 = RestaSignos(PreResultado2,Num1);
							//var TempoDivision = DivideSignos(Resta2,Resta1,Reitera);
							//var Resta3 = RestaSignos(StringUno,TempoDivision);
							//SubResultado = RestaSignos(StringUno,Resta3, Reitera);
							SubResultado = StringUno;
						}				
				}
				if (IsRealNumber(SubResultado) == true ){
					if (GetDecimalPart(SubResultado) >= Reitera - Dos){
						SubResultado = FormatNumberDecimalsLenght(SubResultado, Reitera - Dos);
					}	
				}
				if(EsNegativo1 == true && EsNegativo2 == true ){
					Resultado = StringNullString + SubResultado;
				}
				if(EsNegativo1 == false && EsNegativo2 == false ){
					Resultado = StringNullString + SubResultado;
				}
				if(EsNegativo1 == false && EsNegativo2 == true ){
					Resultado = StringNullString + StringGuion + SubResultado;
				}
				if(EsNegativo1 == true && EsNegativo2 == false ){
					Resultado = StringNullString + StringGuion + SubResultado;
				}
			}
		}else{
			if(EsNegativo1 == false && EsNegativo2 == false ){
				Resultado = StringNullString + StringUno;
			}
			if(EsNegativo1 == true && EsNegativo2 == true ){
				Resultado = StringNullString + StringUno;
			}
			if(EsNegativo1 == false && EsNegativo2 == true ){
				Resultado = StringNullString + StringGuion + StringUno;
			}
			if(EsNegativo1 == true && EsNegativo2 == false ){
				Resultado = StringNullString + StringGuion + StringUno;
			}	
		}	
		
	}
	return Resultado;	
}
function ElevaSignos(Texto1,Texto2,Reiteraciones){
	var EsNum1 = false;
	var EsNum2 = false;
	var EsNegativo1 = false;
	var EsNegativo2 = false;
	var Reitera = StringCero;
	var Resultado = StringCero;
	if (IsNumber(Reiteraciones) == true ){
		var Num1 = StringNullString;
		var Num2 = StringNullString;
		if(IsMayor(StringTreintaiDos,Reiteraciones) == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}		
		if (IsNegativeAndNumber(Texto1) == true){
			EsNum1 = true;
			EsNegativo1 = true;
			Num1 = ConvertPositive(Texto1);	
		}else{
			if (IsNumber(Texto1) == true){
				EsNum1 = true;
				EsNegativo1 = false;
				Num1 = StringNullString + Texto1;
			}
		}
		if (IsNegativeAndNumber(Texto2) == true){
			EsNum2 = true;
			EsNegativo2 = true;
			Num2 = ConvertPositive(FormatCeros(Texto2));	
		}else{
			if (IsNumber(Texto2) == true){
				EsNum2 = true;
				EsNegativo2 = false;
				Num2 = StringNullString + FormatCeros(Texto2);
			}
		}
		
		if (EsNum1 == true && EsNum2 == true && IsMayor(Num1,StringCero) == true && IsMayor(Num2,StringCero) == true && IsEquals(Num1, StringUno) == false){
			var SubResultado = StringNullString;
			// Aquí examino que sean valores mayores a 1 ya que si no se multiplican ambos factores
			if( IsRealNumber(Num2) == true){
				var ParteEntera = StringNullString + GetIntegerPart(Num2);
				var ParteDecimal = StringNullString + GetDecimalPart(Num2);
				if (IsMayor(ParteEntera, StringCero) == true ){
					var PreResultado1 =	ElevaIntegers(Num1,ParteEntera, Reiteraciones);
					var ParteEnteraMas1 = SumaSignos(ParteEntera, StringUno);
					var PreResultado2 =	ElevaIntegers(Num1,ParteEnteraMas1, Reiteraciones);
					var Diferencia = RestaSignos(PreResultado2,PreResultado1);
					if (IsNegativeAndNumber(Diferencia) == true){
						Diferencia = ConvertPositive(Diferencia);
					}
					var Base10 = StringsCerosToRight(StringUno, ParteDecimal.length);
					var ResultadoDivision = DivideSignos(Diferencia,Base10,Reitera);
					var DecimalResultDivision = GetDecimalPart(ResultadoDivision);
					Base10 = StringsCerosToRight( StringUno, Dos);
					var ResultadoenDecimales = DivideSignos(ParteDecimal, Base10, Reitera);
					var Multiplo = MultiplicaSignos(ResultadoDivision,ResultadoenDecimales);
					if (IsMayor(Num1, StringUno) == true ){
						SubResultado = SumaSignos(PreResultado1,Multiplo);
					}else{
						SubResultado = RestaSignos(PreResultado1,Multiplo);
					}
				}else{
					SubResultado = MultiplicaReales(Num1,Num2);	
				}				
			}else{
				SubResultado = ElevaIntegers(Num1,Num2, Reiteraciones);
			}
			// Aquí se decide poner el signo
			if(EsNegativo1 == true && EsNegativo2 == true ){
				Resultado = StringNullString + SubResultado;
			}
			if(EsNegativo1 == false && EsNegativo2 == false ){
				Resultado = StringNullString + SubResultado;
			}
			if(EsNegativo1 == false && EsNegativo2 == true ){
				Resultado = StringNullString + StringGuion + SubResultado;
			}
			if(EsNegativo1 == true && EsNegativo2 == false ){
				Resultado = StringNullString + StringGuion + SubResultado;
			}	
		}else{
			if ( EsNum1 == true && EsNum2 == true && IsEquals(Num1, StringUno) == true){
				Resultado = StringUno;
			}	
		}	
		
	}
	return Resultado;	
}
function Perunitage(Texto1,Texto2,Texto3,Reiteraciones){
	var Num1 = Texto1;
	var Num2 = Texto2;
	var Num3 = Texto3;
	var Reitera = Cero;
	var Resultado = StringCero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}	
		var Multiplo = MultiplicaSignos(Num1, Num3);
		Resultado = DivideSignos(Multiplo, Num2, Reitera);
	}
	return Resultado;
}
function Porcentaje(Texto1,Texto2,Reiteraciones){
	var Num1 = Texto1;
	var Num2 = Texto2;
	var Reitera = Cero;
	var Resultado = StringCero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}	
		var Multiplo = MultiplicaSignos(Num1, StringUno + StringCero + StringCero);
		Resultado = DivideSignos(Multiplo, Num2, Reitera);
	}
	return Resultado;
}
function Pormilaje(Texto1,Texto2,Reiteraciones){
	var Num1 = Texto1;
	var Num2 = Texto2;
	var Reitera = Cero;
	var Resultado = StringCero;
	if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		}
		var Multiplo = MultiplicaSignos(Num1, StringUno + StringCero + StringCero + StringCero);
		Resultado = DivideSignos(Multiplo, Num2, Reitera);
	}
	return Resultado;
}
function MultiplicaSignosAsimetricos(Texto1,Texto2,Texto3){
	var EsNum1 = false;
	var EsNum2 = false;
	var EsNum3 = false;
	var EsNegativo1 = false;
	var Num1 = StringNullString;
	var Num2 = StringNullString;
	var Num3 = StringNullString;
	var Resultado = StringCero;
	if (IsNegativeAndNumber(Texto1) == true ){
		EsNum1 = true;
		EsNegativo1 = true;
		Num1 = StringNullString + Texto1;
	}else{
		if (IsNumber(Texto1) == true ){
			EsNum1 = true;
			Num1 = StringNullString + Texto1;
		}
	}
	if (IsNegativeAndNumber(Texto2) == true ){
		EsNum2 = true;
		Num2 = StringNullString + Texto2;
	}else{
		if (IsNumber(Texto2) == true ){
			EsNum2 = true;
			Num2 = StringNullString + Texto2;
		}		
	}
	if (IsNegativeAndNumber(Texto3) == true ){
		EsNum3 = true;
		Num3 = StringNullString + Texto3;
	}else{
		if (IsNumber(Texto3) == true ){
			EsNum3 = true;
			Num3 = StringNullString + Texto3;
		}		
	}
	if (EsNum1 == true && EsNum2 == true && EsNum3 == true ){
		if (EsNegativo1 == true ){
			Resultado = SumaSignos(MultiplicaSignos(StringGuion + GetIntegerPart(ConvertPositive(Num1)),Num2), Num3);
		}else{
			Resultado = SumaSignos(MultiplicaSignos(GetIntegerPart(Num1),Num2), Num3);
		}
	}
	return Resultado;
}

function MODSignos(Texto1,Texto2,Reiteraciones){
	var Resultado = StringCero;
	if(IsEquals(ConvertPositive(Texto1),StringCero) == false && IsEquals(ConvertPositive(Texto2),StringCero) == false){
		if(IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true ){
			if(IsNegativeAndNumber(Texto2) == true || IsNumber(Texto2) == true ){
				var EsNum1 = false;
				var EsNum2 = false;
				var EsNegativoNum1 = false;
				var EsNegativoNum2 = false;
				var Num1 = StringNullString;
				var Num2 = StringNullString;
				var Reitera = Cero;
				var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
				if(R1 == true ){
					Reitera = TreintaiDos;	
				}else{
					Reitera = Reiteraciones;
				}
				if (IsNegativeAndNumber(Texto1) == true ){
					EsNegativoNum1 = true;
					EsNum1 = true;
					Num1 = ConvertPositive(Texto1);
				}else{
					if (IsNumber(Texto1) == true ){
						EsNum1 = true;
						Num1 = StringNullString + Texto1;
					}
				}
				if (IsNegativeAndNumber(Texto2) == true ){
					EsNegativoNum2 = true;
					EsNum2 = true;
					Num2 = ConvertPositive(Texto2);
				}else{
					if (IsNumber(Texto2) == true ){
						EsNum2 = true;
						Num2 = StringNullString + Texto2;
					}		
				}
				if (EsNum1 == true && EsNum2 == true){
					var SubResultado = DivideSignos(Num1,Num2, Reitera);
					var PreResultado = StringNullString;
					if (IsMayor(StringUno, SubResultado) == false){
						var AnteResultado = MultiplicaSignos(Num2, GetIntegerPart(SubResultado));
						PreResultado = RestaSignos(Num1, AnteResultado);
					}else{
						PreResultado = Num1;
					}
					if (EsNegativoNum1 == true && EsNegativoNum2 == true){
						Resultado = PreResultado;
					}
					if (EsNegativoNum1 == false && EsNegativoNum2 == false){
						Resultado = PreResultado;
					}
					if (EsNegativoNum1 == false && EsNegativoNum2 == true){
						Resultado = StringGuion + PreResultado;
					}
					if (EsNegativoNum1 == true && EsNegativoNum2 == false){
						Resultado = StringGuion + PreResultado;
					}	
				}
			}
		}
	}		
	return FormatCeros(Resultado);
} 
function RestaSignos(Texto1, Texto2){
	var Resultado = StringCero;
	if(IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true ){
		if(IsNegativeAndNumber(Texto2) == true || IsNumber(Texto2) == true ){
			var EsNum1 = false;
			var EsNum2 = false;
			var EsNegativoNum1 = false;
			var EsNegativoNum2 = false;
			var Num1 = StringNullString;
			var Num2 = StringNullString;
			
			if (IsNegativeAndNumber(Texto1) == true ){
				EsNegativoNum1 = true;
				EsNum1 = true;
				Num1 = ConvertPositive(Texto1);
			}else{
				if (IsNumber(Texto1) == true ){
					EsNum1 = true;
					Num1 = StringNullString + Texto1;
				}
			}
			if (IsNegativeAndNumber(Texto2) == true ){
				EsNegativoNum2 = true;
				EsNum2 = true;
				Num2 = ConvertPositive(Texto2);
			}else{
				if (IsNumber(Texto2) == true ){
					EsNum2 = true;
					Num2 = StringNullString + Texto2;
				}		
			}
			if (EsNum1 == true && EsNum2 == true){
				if (EsNegativoNum1 == true && EsNegativoNum2 == true){
					var PreResultado = RestaReales(Num1,Num2);
					if (IsNegative(PreResultado) == true ){
						Resultado = ConvertPositive(PreResultado);
					}else{
						Resultado = StringGuion + PreResultado;
					}	
				}
				if (EsNegativoNum1 == false && EsNegativoNum2 == false){
					var PreResultado = RestaReales(Num1,Num2);
					Resultado = PreResultado;
				}
				if (EsNegativoNum1 == false && EsNegativoNum2 == true){
					var PreResultado = SumaReales(Num1,Num2);
					Resultado = PreResultado;
				}
				if (EsNegativoNum1 == true && EsNegativoNum2 == false){
					var PreResultado = RestaReales(Num1,Num2);
					if (IsNegative(PreResultado) == true ){
						Resultado = ConvertPositive(PreResultado);
					}else{
						Resultado = StringGuion + PreResultado;
					}
				}	
			}
		}	
	}	
	return FormatCeros(Resultado);
}
function SumaSignos(Texto1, Texto2){
	var Resultado = StringCero;
	if(IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true ){
		if(IsNegativeAndNumber(Texto2) == true || IsNumber(Texto2) == true ){
			var EsNum1 = false;
			var EsNum2 = false;
			var EsNegativoNum1 = false;
			var EsNegativoNum2 = false;
			var Num1 = StringNullString;
			var Num2 = StringNullString;
			if (IsNegativeAndNumber(Texto1) == true ){
				EsNegativoNum1 = true;
				EsNum1 = true;
				Num1 = ConvertPositive(Texto1);
			}else{
				if (IsNumber(Texto1) == true ){
					EsNum1 = true;
					Num1 = StringNullString + Texto1;
				}
			}
			if (IsNegativeAndNumber(Texto2) == true ){
				EsNegativoNum2 = true;
				EsNum2 = true;
				Num2 = ConvertPositive(Texto2);
			}else{
				if (IsNumber(Texto2) == true ){
					EsNum2 = true;
					Num2 = StringNullString + Texto2;
				}		
			}
			if (EsNum1 == true && EsNum2 == true){
				if (EsNegativoNum1 == true && EsNegativoNum2 == true){
					var PreResultado = SumaReales(Num1,Num2);
					Resultado = StringGuion + PreResultado;
				}
				if (EsNegativoNum1 == false && EsNegativoNum2 == false){
					var PreResultado = SumaReales(Num1,Num2);
					Resultado = PreResultado;
				}
				if (EsNegativoNum1 == false && EsNegativoNum2 == true){
					var PreResultado = RestaReales(Num1,Num2);
					Resultado = PreResultado;
				}
				if (EsNegativoNum1 == true && EsNegativoNum2 == false){
					var PreResultado = RestaReales(Num1,Num2);
					Resultado = PreResultado;
				}	
			}
		}
	}		
	return Resultado;
}
function MultiplicaSignos(Texto1, Texto2){
	var EsNum1 = false;
	var EsNum2 = false;
	var EsNegativoNum1 = false;
	var EsNegativoNum2 = false;
	var Num1 = StringNullString;
	var Num2 = StringNullString;
	var Resultado = StringCero;
	if (IsNegativeAndNumber(Texto1) == true ){
		EsNegativoNum1 = true;
		EsNum1 = true;
		Num1 = ConvertPositive(Texto1);
	}else{
		if (IsNumber(Texto1) == true ){
			EsNum1 = true;
			Num1 = StringNullString + Texto1;
		}
	}
	if (IsNegativeAndNumber(Texto2) == true ){
		EsNegativoNum2 = true;
		EsNum2 = true;
		Num2 = ConvertPositive(Texto2);
	}else{
		if (IsNumber(Texto2) == true ){
			EsNum2 = true;
			Num2 = StringNullString + Texto2;
		}		
	}
	if (EsNum1 == true && EsNum2 == true){
		var PreResultado = MultiplicaReales(Num1,Num2);
		if (EsNegativoNum1 == true && EsNegativoNum2 == true){
			Resultado = PreResultado;
		}
		if (EsNegativoNum1 == false && EsNegativoNum2 == false){
			Resultado = PreResultado;
		}
		if (EsNegativoNum1 == false && EsNegativoNum2 == true){
			Resultado = StringGuion + PreResultado;
		}
		if (EsNegativoNum1 == true && EsNegativoNum2 == false){
			Resultado = StringGuion + PreResultado;
		}
	}		
	return Resultado;
}
function DivideSignos(Texto1,Texto2,Reiteraciones){
	var EsNum1 = false;
	var EsNum2 = false;
	var EsNegativoNum1 = false;
	var EsNegativoNum2 = false;
	var Num1 = StringNullString;
	var Num2 = StringNullString;
	var Resultado = StringCero;
	var Reitera = Cero;
	if(IsEquals(ConvertPositive(Texto1),StringCero) == false && IsEquals(ConvertPositive(Texto2),StringCero) == false ){
	//if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = Reiteraciones;
		} 
		if (IsNegativeAndNumber(Texto1) == true ){
			EsNegativoNum1 = true;
			EsNum1 = true;
			Num1 = ConvertPositive(Texto1);
		}else{
			if (IsNumber(Texto1) == true ){
				EsNum1 = true;
				Num1 = StringNullString + Texto1;
			}
		}
		if (IsNegativeAndNumber(Texto2) == true ){
			EsNegativoNum2 = true;
			EsNum2 = true;
			Num2 = ConvertPositive(Texto2);
		}else{
			if (IsNumber(Texto2) == true ){
				EsNum2 = true;
				Num2 = StringNullString + Texto2;
			}		
		}
		var SubResultado = StringNullString;
		var PreResultado = StringNullString;
		if (EsNum1 == true && EsNum2 == true){
			SubResultado = DivideNotacion(Num1,Num2,Reitera);
			if (IsNotationNumber(SubResultado) == true ){
				var NumeroFinal = GetNumberInLeftOfNotation(SubResultado);
				var Multiplo = GetNumElevationsInRightOfNotation(SubResultado);
				PreResultado = MultiplicaReales(NumeroFinal, StringsCerosToRight(StringUno, parseInt(Multiplo) + Uno));
			}else{
				PreResultado = SubResultado;
			}
			if (EsNegativoNum1 == true && EsNegativoNum2 == true){
				Resultado = PreResultado;
			}
			if (EsNegativoNum1 == false && EsNegativoNum2 == false){
				Resultado = PreResultado;
			}
			if (EsNegativoNum1 == false && EsNegativoNum2 == true){
				Resultado = StringGuion + PreResultado;
			}
			if (EsNegativoNum1 == true && EsNegativoNum2 == false){
				Resultado = StringGuion + PreResultado;
			}	
		}
	//}
	}
	return Resultado;	
}

// Función Especial Para Tratar Big Numbers en las Divisiones, Reduciendo-lo a Casos Por Miles
function DivideNotacion(Texto1,Texto2,Reiteraciones){
	var EsNum1 = IsNumber(Texto1);
	var EsNum2 = IsNumber(Texto2);
	var Resultado = StringCero;
	var Reitera = Cero;
	//if (IsNumber(Reiteraciones) == true ){
		var R1 = IsMayor(StringTreintaiDos,Reiteraciones);
		if(R1 == true ){
			Reitera = TreintaiDos;	
		}else{
			Reitera = parseInt(Reiteraciones);
		}
		if (EsNum1 == true && EsNum2 == true){
			var Num1 = FormatCeros(Texto1);
			var Num2 = FormatCeros(Texto2);
			var Centralizacion = CentralizeNumbers(Num1,Num2);
			var Separacion = GetNumCerosInLeft(Centralizacion[Uno]);
			if (parseInt(Separacion) >= 3){
				var Multiplo = parseInt(Separacion) - Uno;
				Num2 = MultiplicaReales(Texto2, StringsCerosToRight(StringUno, parseInt(Separacion)));
				Resultado = DivideReales(Num1,Num2,Reitera) + StringLetraE + Multiplo; 
			}else{
				Resultado = DivideReales(Num1,Num2,Reitera);
			}
		}
	//}
	return Resultado;	
}

// Funcion con Elevaciones y Raíces Cuadradas
function PitagorasTheory(Texto1, Texto2, Reiterations, LongDecimales){
	var Resultado = StringCero;
	var ElCuadrado1 = ElevaSignos(Texto1,StringDos, StringNullString + TreintaiDos);
	var ElCuadrado2 = ElevaSignos(Texto2,StringDos, StringNullString + TreintaiDos);
	var SumaCuadrados = SumaSignos(ElCuadrado1,ElCuadrado2);
	Resultado = RootYSignos(SumaCuadrados,StringDos, StringNullString + Reiterations, StringNullString + LongDecimales);
	return Resultado;	
}
// Funcion Para Conseguir Big Numbers en la Raíz de Base Seleccionable
function RootYSignos(Texto1, Texto2, Reiterations, LongDecimales){
	var Resultado = StringCero;
	var Reitera = parseInt(Reiterations);
	var LongiDecimales = parseInt(LongDecimales);
	var EsBaseNegativo = false;
	var Num1 = StringCero;
	var Num2 = StringCero;
	if (IsNumber(Texto1) == true || IsNegativeAndNumber(Texto1) == true ){
		if (IsNumber(Texto2) == true || IsNegativeAndNumber(Texto2) == true ){
			if (parseInt(Reitera) < 32 ) {
				Reitera = 32;	
			}
			if (parseInt(LongiDecimales) < 0 ){
				LongiDecimales = 0;	
			}
			if ( IsNegativeAndNumber(Texto2) == true ){
				EsBaseNegativo = true;
				if ( IsRealNumber(Texto2) == true ){
					Num2 = StringNullString + ConvertPositive(Texto2);
					//Num2 = StringNullString + GetIntegerPart(Num2);
				}else{
					Num2 = StringNullString + ConvertPositive(Texto2);
				}	
			}else{
				if (IsRealNumber(Texto2) == true ){
					//Num2 = StringNullString + GetIntegerPart(Texto2);
					Num2 = StringNullString + Texto2;
				}else{
					Num2 = StringNullString + Texto2;
				}
			}       
			if (IsNegativeAndNumber(Texto1) == true ){
				Num1 = StringNullString + ConvertPositive(Texto1);
				EsNegativo = true;	
			}else{
				Num1 = StringNullString + Texto1;
				EsNegativo = false;
			}
			if (IsMayor(Num1,StringCero) == true && IsMayor(Num2,StringCero) == true ){
				if (IsMayor(Num2, StringDiez) == false ){
					var SubNumero1 = StringCero;
					var Longitud1 = Cero;
					var SubLongitud1 = Cero;
					var ParteEntera1 = StringCero;
					var Llevada = Cero;
					if (IsRealNumber(Num1) == true ){
						ParteEntera1 = StringNullString + GetIntegerPart(Num1);
						Longitud1 = ParteEntera1.length;
					}else{
						ParteEntera1 = StringNullString + Num1;
						Longitud1 = ParteEntera1.length;
					}
					if (Longitud1 >= Diez){
						if (IsPar(StringNullString + Longitud1) == true ){
							SubLongitud1 = Longitud1 - Nueve;
							Llevada = (SubLongitud1 / parseInt(Num2));
						}else{
							SubLongitud1 = Longitud1 - Ocho;
							Llevada = (SubLongitud1 / parseInt(Num2));
						}
						Llevada = parseInt(Llevada);
						var Dieces = StringsCerosToRight(StringUno, SubLongitud1);
						SubNumero1 = DivideSignos(Texto1, Dieces, StringNullString + Reitera);
						var SubResultado = RaizYReal(SubNumero1, Texto2, StringNullString + Reitera, StringNullString + LongiDecimales);
						Dieces = StringsCerosToRight(StringUno, Llevada + Uno );
						Resultado = MultiplicaSignos(SubResultado, Dieces);
					}else{
						Resultado = RaizYReal(Texto1, Texto2, StringNullString + Reitera, StringNullString + LongiDecimales);
					}
				}		
			}	
		}
	}
	if (EsNegativo == true && EsBaseNegativo == true ){
		return ConvertPositive(Resultado);
	}
	if (EsNegativo == false && EsBaseNegativo == true ){
		if (IsNegativeAndNumber(Resultado) == false ){
			return StringGuion + Resultado;
		}else{
			return Resultado;
		}	
	}	
	if (EsNegativo == true && EsBaseNegativo == false ){
		if (IsNegativeAndNumber(Resultado) == false ){
			return StringGuion + Resultado;
		}else{
			return Resultado;
		}
	}
	if (EsNegativo == false && EsBaseNegativo == false ){
		return ConvertPositive(Resultado);
	}
}
function IsPar(Texto1){
	var Resultado = false;
	if (IsNegativeAndNumber(Texto1) == true || IsNumber(Texto1) == true ){
		var ElNumero = StringsRight(Texto1,Uno);
		if (ElNumero == "0"){
			if (Texto1.length > 1){
				Resultado = true 
			}
		}
		if (ElNumero == "2"){
			Resultado = true;
		}
		if (ElNumero == "4"){
			Resultado = true;
		}
		if (ElNumero == "6"){
			Resultado = true;
		}
		if (ElNumero == "8"){
			Resultado = true;
		}
	}
	return Resultado;	
}
// Funciones Derivadas de las Principales Sobre Enteros Para Tratar con Decimales
function RaizYReal(Texto1, Texto2, Reiterations, LongDecimales){
	var Resultado = StringCero;
	var SubResultado = StringCero;
	var Reitera = parseInt(Reiterations);
	var LongiDecimales = parseInt(LongDecimales);
	var Num1 = StringCero;
	var Num2 = StringCero;
	var EsNegativo = false;
	if (IsNumber(Texto1) == true || IsNegativeAndNumber(Texto1) == true ){
		if (IsNumber(Texto2) == true || IsNegativeAndNumber(Texto2) == true ){
			if (parseInt(Reitera) < 32 ) {
				Reitera = 32;	
			}
			if (parseInt(LongiDecimales) < 0 ){
				LongiDecimales = 0;	
			}
			if ( IsNegativeAndNumber(Texto2) == true ){
				if ( IsRealNumber(Texto2) == true ){
					Num2 = StringNullString + ConvertPositive(Texto2);
					//Num2 = StringNullString + GetIntegerPart(Num2);
				}else{
					Num2 = StringNullString + ConvertPositive(Texto2);
				}	
			}else{
				if (IsRealNumber(Texto2) == true ){
					//Num2 = StringNullString + GetIntegerPart(Texto2);
					Num2 = StringNullString + Texto2;
				}else{
					Num2 = StringNullString + Texto2;
				}
			}       
			if (IsNegativeAndNumber(Texto1) == true ){
				Num1 = StringNullString + ConvertPositive(Texto1);
				EsNegativo = true;	
			}else{
				Num1 = StringNullString + Texto1;
				EsNegativo = false;
			}
			if (IsMayor(Num1,StringCero) == true && IsMayor(Num2,StringCero) == true ){
				var CuentaNum1 = StringCero;
				var Salte = false;
				var ElevacionesCuentaNum1 = StringCero;
				while ( Salte == false ){
					CuentaNum1 = SumaSignos(CuentaNum1,StringUno);	
					ElevacionesCuentaNum1 = ElevaSignos(CuentaNum1, Num2, StringNullString + TreintaiDos);
					if( IsMayor(Num1, ElevacionesCuentaNum1) == false || IsEquals(Num1, ElevacionesCuentaNum1) == true){
						Salte = true;
					}
				}
				if ( IsMayor(StringUno, Num2) == true ){	
					if (IsMayor(Num1,Num2) == false || IsEquals(Num1,Num2) == true ){
						var LaResta = RestaSignos(Num2,StringUno);
						ElevacionesCuentaNum1 = ElevaSignos(CuentaNum1, Num2, StringNullString + Reitera);
						var SumadeR = SumaSignos(Num1,ElevacionesCuentaNum1);
						var LaElevacionMenor = ElevaSignos(CuentaNum1, LaResta, StringNullString + Reitera);
						var DivisiondeR = MultiplicaSignos(LaElevacionMenor, StringDos);
						SubResultado = DivideSignos( SumadeR, DivisiondeR, StringNullString + Reitera);
					}else{
						SubResultado = DivideSignos(Num1,Num2,StringNullString + Reitera);
					}	
				}else{
					var LaResta = RestaSignos(Num2,StringUno);
					ElevacionesCuentaNum1 = ElevaSignos(CuentaNum1, Num2, StringNullString + Reitera);
					var SumadeR = SumaSignos(Num1,ElevacionesCuentaNum1);
					var LaElevacionMenor = ElevaSignos(CuentaNum1, LaResta, StringNullString + Reitera);
					var DivisiondeR = MultiplicaSignos(LaElevacionMenor, StringDos);
					SubResultado = DivideSignos( SumadeR, DivisiondeR, StringNullString + Reitera);
				}	
				ElevacionesCuentaNum1 = ElevaSignos(SubResultado, Num2, StringNullString + Reitera);				
					if (IsEquals(Num1, ElevacionesCuentaNum1) == false ){
						if (parseInt(LongiDecimales) != 0 ){
							SubResultado = GetIntegerPart(SubResultado);
							var i;
							for ( i = 1; i <= parseInt(LongiDecimales) + Uno; i++){
								if (IsEquals(Num1, ElevacionesCuentaNum1) == false ){
									var LosNumDecimales = StringsCerosToRight(StringCero + StringComa, i + Uno) + StringUno;
									while ( IsMayor(ElevacionesCuentaNum1, Num1) == false ){
										SubResultado = SumaSignos(SubResultado,LosNumDecimales);
										ElevacionesCuentaNum1 = ElevaSignos(SubResultado, Num2, StringNullString + Reitera );	
									}
									while ( IsMayor(ElevacionesCuentaNum1, Num1) == true ){
										SubResultado = RestaSignos(SubResultado,LosNumDecimales);
										ElevacionesCuentaNum1 = ElevaSignos(SubResultado, Num2, StringNullString + Reitera);
									}
								}else{
									break;
								}		
							}
							Resultado = SubResultado; // DivideSignos(SubResultado, LaResta, StringNullString + Reitera);
						}else{
							Resultado = SubResultado; // DivideSignos(SubResultado, LaResta, StringNullString + Reitera);
						}
					}else{
						Resultado = SubResultado;	
					}
					
			}
		}	
	}
	
	if (EsNegativo == false){
		return Resultado;	
	}else{
		return StringGuion + Resultado;
	}
	
}
function DivideReales(Texto1,Texto2,Reiteraciones){
	var EsNum1 = StringNullString;
	var EsNum2 = StringNullString;
	var Resultado = StringCero;
	var Reitera = Reiteraciones;
	var SubResultado = StringCero;
	//if (typeof(Reiteraciones) == "number" ){
		if (parseInt(Reitera) < 32 ) {
			Reitera = 32;	
		}
		//if (IsNumber(Texto1) == true && IsNumber(Texto2) == true){
			if (IsEquals(Texto1, Texto2) == false ){
				if ( IsEquals(Texto1, StringCero) == false && IsEquals(Texto2, StringCero) == false ){
					var Centralizacion = CentralizeNumbers(Texto1,Texto2);
					var Num1 = StringNullString + Centralizacion[Cero];
					var Num2 = StringNullString + Centralizacion[Uno];
					if ( IsEquals(Texto1, Texto2) == false ){
						var SubNum1 = StringNullString + FormatCeros(Texto1);
						var SubNum2 = StringNullString + FormatCeros(Texto2);
						var i ;
						var Restante = StringNullString + Num1;
						var LongitudComa = Cero;
						var RestaRestante = StringNullString;
						var ComienzoString = StringNullString;
						var Primero = false;
						while (SubResultado.length < Reitera){
							if (IsMayor(Num2, Restante) == true ){
								if (parseInt(LongitudComa) == Cero){
									Resultado = StringNullString + StringCero + Resultado ;
									LongitudComa = SubResultado.length;	
								}else{
									Resultado = StringNullString + Resultado + StringCero;
								}
								Restante = StringNullString + MultiplicaReales(Restante, StringDiez );
							}else{	
								RestaRestante = StringNullString + RestaReales(Restante,Num2);
								while (IsMayor(Restante, Num2) == true ){
									RestaRestante = StringNullString + RestaReales(Restante,Num2);
									Resultado = StringNullString + SumaIntegers(Resultado,StringUno);
									Restante = StringNullString + RestaRestante;
									if (IsMayor(Restante, Num2) == false ){
										break;
									}
								}
								if (IsMayor( Num2, Restante ) == false ){
									RestaRestante = StringNullString + RestaReales(Restante,Num2);
									Resultado = StringNullString + SumaIntegers(Resultado,StringUno);
									Restante = StringNullString + RestaRestante;
								}
								
								SubResultado = StringNullString + ComienzoString + Resultado;
								
								if (IsMayor(Restante, StringCero) == false ){
									break;
								}
								
								if (Primero == false ) {
									var LongitudEnCeros = GetNumCerosInLeft(Resultado);
									ComienzoString = StringNullString + StringsLeft(Resultado, LongitudEnCeros);
									Primero = true;
								}
								
								SubResultado = StringNullString + ComienzoString + Resultado;
								
								if (parseInt(LongitudComa) == Cero){
									LongitudComa = Resultado.length;
								}else{
									var NumVeces = Num2.length - (Restante.length - Uno);
									var Operando = StringsCerosToRight(StringUno, NumVeces + Uno);
									Restante = StringNullString + StringsCerosToRight(Restante, Restante.length + NumVeces);
									Resultado = StringNullString + MultiplicaReales(Resultado, Operando);
								}
							}
						}
						if (parseInt(LongitudComa) != Cero){
							SLeft = StringsLeft(SubResultado, parseInt(LongitudComa));
							SRight = StringsRight( SubResultado, SubResultado.length - SLeft.length);
							SubResultado = SLeft + StringComa + SRight;
						}else{
							SubResultado = Resultado;
						}
					}	
				}else{
					SubResultado = StringCero;
				}
			}else{
				SubResultado = StringUno;
			}		
		//}	
	//}
	return FormatCeros(SubResultado);
}

function MultiplicaReales(Texto1,Texto2){
	var Resultado = StringCero;
	//if (IsNumber(Texto1) == true && IsNumber(Texto2) == true){
		if (IsEquals(Texto1, StringCero ) == false && IsEquals(Texto2, StringCero ) == false ){
			var Centralizacion = CentralizeNumbers(Texto1,Texto2);
			if (parseInt(Centralizacion[Tres]) == Cero) {
				Resultado = MultiplicaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
			}else{
				var PreResultado = StringNullString + MultiplicaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
				Resultado = StringsLeft(PreResultado, PreResultado.length - ( Dos * parseInt(Centralizacion[Tres]))) + StringComa + StringsRight(PreResultado, ( 2 * parseInt(Centralizacion[Tres])));
			}
		}else{
			Resultado = StringCero;
		}
	//}
	return FormatCeros(Resultado);
}
function RestaReales(Texto1,Texto2){
	var Resultado = StringCero;
	//if (IsNumber(Texto1) == true && IsNumber(Texto2) == true){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2);
		if (parseInt(Centralizacion[Tres]) == Cero) {
			Resultado = RestaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
		}else{
			var PreResultado = StringNullString + RestaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
			Resultado = StringsLeft(PreResultado, PreResultado.length - parseInt(Centralizacion[Tres])) + StringComa + StringsRight(PreResultado, parseInt(Centralizacion[Tres]));
		}
	//}	
	return FormatCeros(Resultado);
}
function SumaReales(Texto1,Texto2){
	var Resultado = StringCero;
	//if (EsNum1 == true && EsNum2 == true){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2);
		if (parseInt(Centralizacion[Tres]) == Cero) {
			Resultado = SumaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
		}else{
			var PreResultado = StringNullString + SumaIntegers(Centralizacion[Cero],Centralizacion[Uno]);
			Resultado = StringsLeft(PreResultado, PreResultado.length - parseInt(Centralizacion[Tres])) + StringComa + StringsRight(PreResultado, parseInt(Centralizacion[Tres]));
		}
	//}	
	return FormatCeros(Resultado);
}

// Funciones Principales de Calculos con Enteros
function FactorialIntegers(Texto){
	var Resultado = StringCero;
	var ElNumero = parseInt(Texto);
	var Temporal = StringUno;
	if ( IsMayor(Texto, StringCero + StringComa + StringNueve) == true && IsRealNumber(Texto) == false ){
		var i;
		Resultado = StringUno;
		for ( i = Dos; i <= ElNumero; i++ ){
			Resultado = MultiplicaReales(Temporal, StringNullString + i);
			Temporal = Resultado;
		}
	}
	return Resultado;
}
function ElevaIntegers(Texto1,Texto2, Reiterations){
	var Resultado = StringCero;
	if (IsNumber(Texto1) == true && IsNumber(Texto2) == true){
		if (IsEquals(Texto1, StringCero) == false && IsEquals(Texto2, StringCero) == false){
			var EsReal2 = IsRealNumber(Texto2);
			if (EsReal2 == false){
				var Longitud = Texto2.length;
				if (Texto2.length <= 5){
					if(IsMayor(Texto2, StringUno) == true ){
						Resultado = MultiplicaReales(Texto1,Texto1);
						var i;
						for ( i = Dos; i < parseInt(Texto2); i++ ){
							Resultado = MultiplicaReales(Resultado,Texto1);
							//if(IsMayor(Resultado, StringUno) == false ){
								Resultado = FormatNumberDecimalsLenght(Resultado, parseInt(Reiterations) - Dos);
							//}
						}
					}else{
						Resultado = Texto1;
					}	
				}
			}
		}	
	}
	return Resultado;
}
function MultiplicaIntegers(Texto1,Texto2){
	var ResultadosSuma = [];
	var Resultado = StringCero;
	//if (IsNumber(Texto1) == true && IsNumber(Texto2) == true && IsRealNumber(Texto1) == false && IsRealNumber(Texto2) == false ){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2)
		var Num1 = StringNullString + Centralizacion[0];
		var Num2 = StringNullString + Centralizacion[1];
		var UnidadDeMas = Cero;
		var i = Cero;
		var n = Cero;
		if (IsMayor(Num1,Num2) == true){
			var Largada = Centralizacion[Cero];
			for (n = Uno; n <= Largada.length; n++ ){
				var T1 = StringsRight(Num1, Uno);
				if (n != Uno){
					ResultadosSuma.push(StringsCerosToRight(StringNullString, n - Uno));
				}else{
					ResultadosSuma.push(StringNullString);
				}
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length);
				for (i = Uno; i <= Largada.length ; i++){
					var T2 = StringsRight(Num2, Uno);
					if (parseInt(T1) != Cero ){
						var	R1 = parseInt(T2) * parseInt(T1);
						var R3 = parseInt(R1) + parseInt(UnidadDeMas);
						var R2 = StringNullString + R3;
						if (R2.length > Uno ){
							UnidadDeMas = parseInt(StringsLeft(R2,Uno));
						}else{
							UnidadDeMas = Cero;
						}
						ResultadosSuma[n - Uno] = StringNullString + StringsRight(R2,Uno) + ResultadosSuma[n - Uno];				
					}else{
						ResultadosSuma[n - Uno] = StringNullString + StringCero + ResultadosSuma[n - Uno];
					}
					Num2 = StringsLeft(Centralizacion[Uno], Largada.length - i);
				}
				if (parseInt(UnidadDeMas) != Cero){
					ResultadosSuma[n - Uno] = StringNullString + UnidadDeMas + ResultadosSuma[n - Uno];
				}
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length - n);
				UnidadDeMas = Cero;
			}
			for (n = Cero; n < ResultadosSuma.length; n++ ){
				var Anterior = Resultado;
				Resultado = SumaIntegers(Anterior, ResultadosSuma[n] );
			}
		}else{
			var Largada = Centralizacion[Uno];
			
			for (n = Uno; n <= Largada.length; n++ ){
				var T2 = StringsRight(Num2, Uno);
				if (n != Uno){
					ResultadosSuma.push(StringsCerosToRight(StringNullString, n - Uno));
				}else{
					ResultadosSuma.push(StringNullString);
				}
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length);
				for (i = Uno; i <= Largada.length ; i++){
					var T1 = StringsRight(Num1, Uno);
					if (parseInt(T2) != Cero ){
						var	R1 = parseInt(T2) * parseInt(T1);
						var R3 = parseInt(R1) + parseInt(UnidadDeMas);
						var R2 = StringNullString + R3;
						if (R2.length > Uno ){
							UnidadDeMas = parseInt(StringsLeft(R2,Uno));
						}else{
							UnidadDeMas = Cero;
						}
						ResultadosSuma[n - Uno] = StringNullString + StringsRight(R2,Uno) + ResultadosSuma[n - Uno];				
					}else{
						ResultadosSuma[n - Uno] = StringNullString + StringCero + ResultadosSuma[n - Uno];
					}
					Num1 = StringsLeft(Centralizacion[Cero], Largada.length - i);
				}
				if (parseInt(UnidadDeMas) != Cero){
					ResultadosSuma[n - Uno] = StringNullString + UnidadDeMas + ResultadosSuma[n - Uno];
				}
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length - n);
				UnidadDeMas = Cero;
			}
			for (n = Cero; n < ResultadosSuma.length; n++ ){
				var Anterior = Resultado;
				Resultado = SumaIntegers(Anterior, ResultadosSuma[n] );
			}	
		}
	//}
	if (Resultado == StringNullString){
		return StringCero;
	}else{
		return Resultado;
	}
}
function RestaIntegers(Texto1,Texto2){
	var Resultado = StringNullString;
	//if (IsNumber(Texto1) == true && IsNumber(Texto2) == true && IsRealNumber(Texto1) == false && IsRealNumber(Texto2) == false ){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2)
		var Num1 = StringNullString + Centralizacion[0];
		var Num2 = StringNullString + Centralizacion[1];
		var UnidadDeMas = Cero;
		var i;
		if (IsMayor(Num1,Num2) == true){
			var Largada = Centralizacion[Cero];
			for (i = 1; i <= Largada.length ; i++){
				var T1 = StringsRight(Num1, Uno);
				var T2 = StringsRight(Num2, Uno);
				var R1 = parseInt(T1) - ( parseInt(T2) + parseInt(UnidadDeMas));
				var R2 = StringNullString + R1;
				if (IsNegative(R2) == true ){
					var R3 = Diez + parseInt(R2);
					var R4 = StringNullString + R3;
					Resultado = StringNullString + StringsRight(R4,Uno) + Resultado;	
					UnidadDeMas = Uno 
				}else{
					Resultado = StringNullString + StringsRight(R2,Uno) + Resultado;
					UnidadDeMas = Cero;
				}
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length - i);
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length - i);
			}
			if (parseInt(UnidadDeMas) != Cero){
				Resultado = StringNullString + UnidadDeMas + Resultado;
			}
		}else{
			var Largada = Centralizacion[1];
			for (i = 1; i <= Largada.length ; i++){
				var T1 = StringsRight(Num1, Uno);
				var T2 = StringsRight(Num2, Uno);
				var	R1 = parseInt(T2) - ( parseInt(T1) + parseInt(UnidadDeMas));
				var R2 = StringNullString + R1;
				if (IsNegative(R2) == true ){
					var R3 = Diez + parseInt(R2);
					var R4 = StringNullString + R3;
					Resultado = StringNullString + StringsRight(R4,Uno) + Resultado;	
					UnidadDeMas = Uno 
				}else{
					Resultado = StringNullString + StringsRight(R2,Uno) + Resultado;
					UnidadDeMas = Cero;
				}			
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length - i);
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length - i);
			}
			if (parseInt(UnidadDeMas) != Cero){
				Resultado = StringNullString +  UnidadDeMas + Resultado;
			}
			Resultado = StringGuion + Resultado;
		}
	//}
	if (Resultado == StringNullString){
		return StringCero;
	}else{
		return Resultado;
	}
}
function SumaIntegers(Texto1,Texto2){
	var EsNum1 = IsNumber(Texto1);
	var EsNum2 = IsNumber(Texto2);
	var EsReal1 = IsRealNumber(Texto1);
	var EsReal2 = IsRealNumber(Texto2);
	var Resultado = StringNullString;
	//if (EsNum1 == true && EsNum2 == true && EsReal1 == false && EsReal2 == false ){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2)
		var Num1 = StringNullString + Centralizacion[0];
		var Num2 = StringNullString + Centralizacion[1];
		var UnidadDeMas = Cero;
		var i;
		if (IsMayor(Num1,Num2) == true){
			var Largada = Centralizacion[Cero];
			for (i = 1; i <= Largada.length ; i++){
				var T1 = StringsRight(Num1, Uno);
				var T2 = StringsRight(Num2, Uno);
				var R1 = parseInt(T1) + parseInt(T2) + parseInt(UnidadDeMas);
				var R2 = StringNullString + R1;
				if (R2.length > Uno ){
					UnidadDeMas = parseInt(StringsLeft(R2,Uno));
				}else{
					UnidadDeMas = Cero;
				}	
				Resultado = StringNullString + StringsRight(R2,Uno) + Resultado;
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length - i);
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length - i);
			}
			if (parseInt(UnidadDeMas) != Cero){
				Resultado = StringNullString + UnidadDeMas + Resultado;
			}
		}else{
			var Largada = Centralizacion[1];
			for (i = 1; i <= Largada.length ; i++){
				var T1 = StringsRight(Num1, Uno);
				var T2 = StringsRight(Num2, Uno);
				var	R1 = parseInt(T2) + parseInt(T1) + parseInt(UnidadDeMas);
				var R2 = StringNullString + R1;
				if (R2.length > Uno ){
					UnidadDeMas = parseInt(StringsLeft(R2,Uno));
				}else{
					UnidadDeMas = Cero;
				}
				Resultado = StringNullString + StringsRight(R2,Uno) + Resultado;				
				Num1 = StringsLeft(Centralizacion[Cero], Largada.length - i);
				Num2 = StringsLeft(Centralizacion[Uno], Largada.length - i);
			}
			if (parseInt(UnidadDeMas) != Cero){
				Resultado = StringNullString + UnidadDeMas + Resultado;
			}
		}
	//}
	if (Resultado == StringNullString){
		return StringCero;
	}else{
		return Resultado;
	}
}

// Funciones Para Acceder y Dar Formato a los Números
function GetNumberInLeftOfNotation(Texto){
	var Resultado = StringNullString;
	var Num = StringNullString + Texto;
	if (IsNotationNumber(Num) == true){
		var i;
		for (i = Uno; i <= Texto.length; i++){
			var T1 = StringsLeft(Num, Uno);
			if (T1 == StringLetraE ){
				break;
			}else{
				Resultado = StringNullString + Resultado + T1;
			}
			Num = StringsRight(Texto, Texto.length - i);
		}
	}
	return Resultado;
}
function GetNumElevationsInRightOfNotation(Texto){
	var Resultado = StringNullString;
	var Num = StringNullString + Texto;
	if (IsNotationNumber(Num) == true){
		var i;
		for (i = Uno; i <= Texto.length; i++){
			var T1 = StringsRight(Num, Uno);
			if (T1 == StringLetraE ){
				break;
			}else{
				Resultado = StringNullString + T1 + Resultado;
			}
			Num = StringsLeft(Texto, Texto.length - i);
		}
	}
	return parseInt(Resultado);
}
function GetNumCerosInLeft(Texto){
	var Resultado = Cero;
	var Num = Texto;
	if (IsNumber(Num) == true){
		var i;
		for (i = 1; i <= Texto.length; i++){
			var T1 = StringsLeft(Num, Uno);
			if (parseInt(T1) != Cero){
				break;
			}else{
				Resultado++;
			}
			Num = StringsRight(Texto, Texto.length - i);
		}
	}
	return Resultado;
}
function ConvertPositive(Texto){
	var Resultado = StringCero;
	if (IsNegativeAndNumber(Texto) == true){
		Resultado = StringsRight(Texto, Texto.length - Uno);
	}else{
		if (IsNumber(Texto) == true){
			Resultado = Texto;	
		}
	}
	return Resultado;
}
function FormatCeros(Texto){
	var EsNum = false;
	var EsNegativo = false;
	var CopiaTexto = StringNullString;
	if (IsNegativeAndNumber(Texto) == true){
		EsNegativo = true;
		EsNum = true;
		CopiaTexto = ConvertPositive(Texto);
	}else{
		if (IsNumber(Texto) == true){
			EsNegativo = false;
			EsNum = true;
			CopiaTexto = StringNullString + Texto;
		}
	}
	var Resultado = StringNullString;
	if (EsNum == true){
		if (IsRealNumber(CopiaTexto) == true ){
			var ParteEntera = GetIntegerPart(CopiaTexto);
			var ParteDecimal = GetDecimalPart(CopiaTexto);
			var i;
			
			var Cuenta = Cero;
			var Tempo = StringNullString + ParteEntera;
			for (i = 1; i < ParteEntera.length; i++){
				var T1 = StringsLeft(Tempo, Uno);
				if (parseInt(T1) == Cero ) {
					Cuenta++;
				}else{
					break;
				}
				Tempo = StringsRight(ParteEntera, ParteEntera.length - i);	
			}
			Resultado = StringsRight(ParteEntera, ParteEntera.length - Cuenta);
			Cuenta = Cero;
			var Tempo = StringNullString + ParteDecimal;
			for (i = 1; i <= ParteDecimal.length; i++){
				var T1 = StringsRight(Tempo, Uno);
				if (parseInt(T1) == Cero ) {
					Cuenta++;
				}else{
					break;
				}
				Tempo = StringsLeft(ParteDecimal, ParteDecimal.length - i);	
			}
			if (ParteDecimal.length - Cuenta != Cero ){
				Resultado = Resultado + StringComa + StringsLeft(ParteDecimal, ParteDecimal.length - Cuenta);
			}
			
		}else{
			var i;
			
			var Cuenta = Cero;
			var Tempo = StringNullString + CopiaTexto;
			for (i = 1; i < CopiaTexto.length; i++){
				var T1 = StringsLeft(Tempo, Uno);
				if (parseInt(T1) == Cero ) {
					Cuenta++;
				}else{
					break;
				}
				Tempo = StringsRight(CopiaTexto, CopiaTexto.length - i);	
			}
			Resultado = StringsRight(CopiaTexto, CopiaTexto.length - Cuenta);
		}
	}
	if (EsNegativo == true ){
		if (Resultado.length == 1){
			if (parseInt(Resultado) == Cero){
				return Resultado;
			}else{
				return StringGuion + Resultado;
			}
		}else{
			return StringGuion + Resultado;	
		}		
	}else{
		return Resultado;
	}
}

function CentralizeNumbers(Texto1,Texto2){
	var EsNum1 = IsNumber(Texto1);
	var EsNum2 = IsNumber(Texto2);
	var R1 = StringNullString;
	var R2 = StringNullString;
	var CopiaTexto1 = StringNullString + Texto1;
	var CopiaTexto2 = StringNullString + Texto2;
	var MaximoEntero = Cero;
	var MaximoDecimal = Cero;
	  
	if (EsNum1 == true && EsNum2 == true ){
		var EsReal1 = IsRealNumber(CopiaTexto1);
		var EsReal2 = IsRealNumber(CopiaTexto2);
		if (EsReal1 == true && EsReal2 == true ){
			var CopiaEntero1 = GetIntegerPart(CopiaTexto1);
			var CopiaDecimal1 = GetDecimalPart(CopiaTexto1);
			var CopiaEntero2 = GetIntegerPart(CopiaTexto2);  
			var CopiaDecimal2 = GetDecimalPart(CopiaTexto2);
			if (CopiaEntero1.length >= CopiaEntero2.length){
				R1 = StringNullString + CopiaEntero1;
				R2 = StringNullString + StringsCerosToLeft(CopiaEntero2, CopiaEntero1.length);
				MaximoEntero = CopiaEntero1.length;
			}else{				
				R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero2.length);
				R2 = StringNullString + CopiaEntero2;
				MaximoEntero = CopiaEntero2.length;
			}
			if (CopiaDecimal1.length >= CopiaDecimal2.length){
				R1 = R1 + CopiaDecimal1;
				R2 = R2 + StringsCerosToRight(CopiaDecimal2, CopiaDecimal1.length);
				MaximoDecimal = CopiaDecimal1.length;
			}else{
				R1 = R1 + StringsCerosToRight(CopiaDecimal1, CopiaDecimal2.length);
				R2 = R2 + CopiaDecimal2;
				MaximoDecimal = CopiaDecimal2.length;
			}	
		}else{
			if (EsReal1 == false && EsReal2 == true ){
				var CopiaEntero1 = CopiaTexto1;
				var CopiaDecimal1 = StringNullString;
				var CopiaEntero2 = GetIntegerPart(CopiaTexto2);  
				var CopiaDecimal2 = GetDecimalPart(CopiaTexto2);
				if (CopiaEntero1.length >= CopiaEntero2.length){
					R1 = StringNullString + CopiaEntero1;
					R2 = StringNullString + StringsCerosToLeft(CopiaEntero2, CopiaEntero1.length);
					MaximoEntero = CopiaEntero1.length;
				}else{				
					R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero2.length);
					R2 = StringNullString + CopiaEntero2;
					MaximoEntero = CopiaEntero2.length;
				}
				if (CopiaDecimal1.length >= CopiaDecimal2.length){
					R1 = R1 + CopiaDecimal1;
					R2 = R2 + StringsCerosToRight(CopiaDecimal2, CopiaDecimal1.length);
					MaximoDecimal = CopiaDecimal1.length;
				}else{
					R1 = R1 + StringsCerosToRight(CopiaDecimal1, CopiaDecimal2.length);
					R2 = R2 + CopiaDecimal2;
					MaximoDecimal = CopiaDecimal2.length;
				}
				//var CopiaEntero1 = CopiaTexto1;  
				//var CopiaDecimal1 = StringNullString;
				//var CopiaEntero2 = GetIntegerPart(CopiaTexto2);  
				//var CopiaDecimal2 = GetDecimalPart(CopiaTexto2);
				//if (CopiaEntero1.length > CopiaEntero2.length){
				//	R1 = StringNullString + CopiaEntero1;
				//	R2 = StringNullString + StringsCerosToLeft(CopiaEntero2, CopiaEntero1.length);
				//	MaximoEntero = CopiaEntero1.length;
				//}else{					
				//	R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero2.length);
				//	R2 = StringNullString + CopiaEntero2;
				//	MaximoEntero = CopiaEntero2.length;
				//}
				//R1 = R1 + StringsCerosToRight(CopiaDecimal1, CopiaDecimal2.length);
				//R2 = R2 + StringsCerosToRight(CopiaDecimal2, CopiaDecimal2.length);
				//MaximoDecimal = CopiaDecimal2.length;
			}else{
				if (EsReal1 == true && EsReal2 == false ){
					var CopiaEntero1 = GetIntegerPart(CopiaTexto1);
					var CopiaDecimal1 = GetDecimalPart(CopiaTexto1);
					var CopiaEntero2 = CopiaTexto2;  
					var CopiaDecimal2 = StringNullString;
					if (CopiaEntero1.length >= CopiaEntero2.length){
						R1 = StringNullString + CopiaEntero1;
						R2 = StringNullString + StringsCerosToLeft(CopiaEntero2, CopiaEntero1.length);
						MaximoEntero = CopiaEntero1.length;
					}else{				
						R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero2.length);
						R2 = StringNullString + CopiaEntero2;
						MaximoEntero = CopiaEntero2.length;
					}
					if (CopiaDecimal1.length >= CopiaDecimal2.length){
						R1 = R1 + CopiaDecimal1;
						R2 = R2 + StringsCerosToRight(CopiaDecimal2, CopiaDecimal1.length);
						MaximoDecimal = CopiaDecimal1.length;
					}else{
						R1 = R1 + StringsCerosToRight(CopiaDecimal1, CopiaDecimal2.length);
						R2 = R2 + CopiaDecimal2;
						MaximoDecimal = CopiaDecimal2.length;
					}
					
					//var CopiaEntero1 = GetIntegerPart(CopiaTexto1);  
					//var CopiaDecimal1 = GetDecimalPart(CopiaTexto1);
					//var CopiaEntero2 = CopiaTexto2;  
					//var CopiaDecimal2 = StringNullString;
					//if (CopiaEntero1.length >= CopiaEntero2.length){
					//	R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero1.length);;
					//	R2 = StringNullString + StringsCerosToLeft(CopiaEntero2, CopiaEntero2.length);
					//	MaximoEntero = CopiaEntero2.length;
					//}else{				
					//	R1 = StringNullString + StringsCerosToLeft(CopiaEntero1, CopiaEntero2.length);
					//	R2 = StringNullString + CopiaEntero2;
					//	MaximoEntero = CopiaEntero1.length;
					//}
					//R1 = R1 + StringsCerosToRight(CopiaEntero1, CopiaDecimal2.length);
					//R2 = R2 + StringsCerosToRight(CopiaEntero2, CopiaDecimal1.length);
					//MaximoDecimal = CopiaDecimal1.length;
				}else{
					if (CopiaTexto1.length >= CopiaTexto2.length){
						R1 = StringNullString + CopiaTexto1;
						R2 = StringNullString + StringsCerosToLeft(CopiaTexto2, CopiaTexto1.length);
						MaximoEntero = CopiaTexto1.length;
					}else{				
						R1 = StringNullString + StringsCerosToLeft(CopiaTexto1, CopiaTexto2.length);
						R2 = StringNullString + CopiaTexto2;
						MaximoEntero = CopiaTexto2.length;
					}
					if (CopiaTexto1.length >= CopiaTexto2.length){
						MaximoEntero = CopiaTexto1.length;
						MaximoDecimal = Cero;
					}else{
						MaximoEntero = CopiaTexto2.length;
						MaximoDecimal = Cero;
					}
				}
			}
		}
	}	
	return [StringNullString + R1, StringNullString + R2, MaximoEntero, MaximoDecimal];
}
// Funciones de Número
function FormatNumberDecimalsLenght(Texto1, NumberDecimals){
	if (IsNumber(Texto1) == false){
		if (IsNegativeAndNumber(Texto1) == false){
			return StringNullString;
		}else{
			if (IsRealNumber(Texto1) == true ){
				var Izq = GetIntegerPart(Texto1);
				var Der = GetDecimalPart(Texto1);
				var DerCompleta = StringsLeft(Der, NumberDecimals);
				return Izq + StringComa + DerCompleta;
			}else{
				return Texto1;
			}
		}
	
	}else{
		if (IsRealNumber(Texto1) == true ){
			var Izq = GetIntegerPart(Texto1);
			var Der = GetDecimalPart(Texto1);
			var DerCompleta = StringsLeft(Der, NumberDecimals);
			return Izq + StringComa + DerCompleta;
		}else{
			return Texto1;
		}
	}
}
function GetIntegerPart(Texto){
	var EsReal = IsRealNumber(Texto);
	if (EsReal == true ){
		return GetLeftNumber(Texto);
	}else{
		return Texto;
	}
}
function GetDecimalPart(Texto){
	var EsReal = IsRealNumber(Texto);
	if (EsReal == true ){
		return GetRightNumber(Texto);
	}else{
		return Texto;
	}
}

// Funciones de Pregunta
function IsNotationNumber(Texto){
	var EsNumero = false;
	var EsReal = false;
	var EsNotacion = false;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve ){
			EsNumero = true;
		}else{
			if (T == StringLetraE && EsNotacion == false){
				EsNotacion = true; 
			}else{
				if (EsReal == false && T == StringComa) {
					EsReal = true;
				}else{
					EsNotacion = false;
					break;
				}
			}			
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	if (StringsLeft(Texto, Uno) == StringComa || StringsRight(Texto, Uno) == StringComa) {
		return false;
	}else{
		return EsNotacion;
	}
}
function IsEquals(Texto1,Texto2){
	var EsNum1 = IsNumber(Texto1);
	var EsNum2 = IsNumber(Texto2);
	var Resultado = false;
	if (EsNum1 == true && EsNum2 == true ){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2);
		var Temp1 = StringNullString + Centralizacion[Cero];
		var Temp2 = StringNullString + Centralizacion[Uno];
		var Largada = StringNullString + Centralizacion[Cero];
		var i;
		for ( i = Uno; i <= Largada.length ; i++){
			var T1 = StringsLeft(Temp1, Uno);
			var T2 = StringsLeft(Temp2, Uno);
			if (parseInt(T1) == parseInt(T2)){
				Resultado = true;
			}else{
				if (parseInt(T1) != parseInt(T2)){
					Resultado = false;
					break;
				}	
			}
			Temp1 = StringsRight(Centralizacion[Cero], Largada.length - i);
			Temp2 = StringsRight(Centralizacion[Uno], Largada.length - i);
		}
	}	
	return Resultado;	
}
function IsMayor(Texto1,Texto2){
	var EsNum1 = IsNumber(Texto1);
	var EsNum2 = IsNumber(Texto2);
	var Resultado = false;
	if (EsNum1 == true && EsNum2 == true ){
		var Centralizacion = CentralizeNumbers(Texto1,Texto2);
		var Temp1 = StringNullString + Centralizacion[Cero];
		var Temp2 = StringNullString + Centralizacion[Uno];
		var Largada = StringNullString + Centralizacion[Cero];
		var i;
		for ( i = Uno; i <= Largada.length ; i++){
			var T1 = StringsLeft(Temp1, Uno);
			var T2 = StringsLeft(Temp2, Uno);
			if (parseInt(T1) > parseInt(T2)){
				Resultado = true;
				break;
			}else{
				if (parseInt(T1) != parseInt(T2)){
					Resultado = false;
					break;
				}	
			}
			Temp1 = StringsRight(Centralizacion[Cero], Largada.length - i);
			Temp2 = StringsRight(Centralizacion[Uno], Largada.length - i);
		}
	}	
	return Resultado;	
}
function IsBinaryNumber(Texto){
	var EsBinario = false;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno){
			EsBinario = true;
		}else{
			EsBinario = false;
			break;
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	return EsBinario;
}
function IsOctalNumber(Texto){
	var EsOctal = false;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete ){
			EsOctal = true;
		}else{
			EsOctal = false;
			break;
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	return EsOctal;
}
function IsHexadecimalNumber(Texto){
	var EsHexadecimal = false;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve || T == "A" || T == "B" || T == "C" || T == "D" || T == "E" || T == "F" ){
			EsHexadecimal = true;
		}else{
			EsHexadecimal = false;
			break;
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	return EsHexadecimal;
}
function IsNumber(Texto){
	var EsNumero = false;
	var EsReal = false;
	var i;
	var ElNumero = StringNullString + Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve ){
			EsNumero = true;
		}else{
			if (EsReal == false && T == StringComa) {
				EsNumero = true;
				EsReal = true;
			}else{
				EsNumero = false;
				break;
			}
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	if (StringsLeft(Texto, Uno) == StringComa || StringsRight(Texto, Uno) == StringComa) {
		return false;
	}else{
		return EsNumero;
	}
}
function IsRealNumber(Texto){
	var EsNumero = false;
	var EsReal = false;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve){
			EsNumero = true;
		}else{
			if (EsReal == false && T == StringComa) {
				EsReal = true;
				EsNumero = true;
			}else{
				EsReal = false;
				EsNumero = false;
				break;
			}
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	return EsReal;
}
function IsNegative(Texto){
	var Resultado = StringsLeft(Texto, Uno);
	if (Resultado == StringGuion ){
		return true;
	}else{
		return false;
	}
}
function IsNegativeAndNumber(Texto){
	var Resultado = false;
	var R = IsNegative(Texto);
	if (R == true ){
		var T = StringsRight(Texto, Texto.length - Uno);
		Resultado = IsNumber(T);
	}
	return Resultado;
}

// Funciones de Strings
function GetLeftNumber(Texto){
	var NumeroVeces = 0;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsLeft(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve ){
			NumeroVeces += Uno;
		}else{
			break;
		}
		ElNumero = StringsRight(Texto, Texto.length - i );
	}
	return StringsLeft(Texto, NumeroVeces);
}
function GetRightNumber(Texto){
	var NumeroVeces = 0;
	var i;
	var ElNumero = Texto;
	for (i = 1; i <= Texto.length; i++){
		var T = StringsRight(ElNumero, Uno);
		if (parseInt(T) == Cero || parseInt(T) == Uno || parseInt(T) == Dos || parseInt(T) == Tres || parseInt(T) == Cuatro || parseInt(T) == Cinco || parseInt(T) == Seis || parseInt(T) == Siete || parseInt(T) == Ocho || parseInt(T) == Nueve ){
			NumeroVeces += Uno;
		}else{
			break;
		}
		ElNumero = StringsLeft(Texto, Texto.length - i );
	}
	return StringsRight(Texto, NumeroVeces);
}
function StringsLeft(Texto, Longitud){
	if (Texto == StringNullString ){
		return StringNullString;
	}else{
		if (typeof(Longitud) != "number"){
			return StringNullString;
		}else{
			if ( Texto.length <= Longitud ){
				return Texto;
			}else{
				return Texto.substring(0, Longitud);
			}	
		}	
	}
}
function StringsRight(Texto, Longitud){
	if (Texto == StringNullString ){
		return StringNullString;
	}else{
		if (typeof(Longitud) != "number"){
			return StringNullString;
		}else{
			if ( Texto.length <= Longitud ){
				return Texto;
			}else{
				return Texto.substring(Texto.length - Longitud, Texto.length);
			}
		}	
	}
}
function StringsCerosToRight(Texto, Longitud){
	if (typeof(Longitud) != "number" || Longitud - Texto.length <= Cero){
		return Texto;
	}else{
		var i;
		var Resultado = Texto;
		for ( i = Texto.length; i < Longitud; i++){
			Resultado = Resultado + StringCero;
		}
		return Resultado; 
	}
}
function StringsCerosToLeft(Texto, Longitud){
	if (typeof(Longitud) != "number" || Longitud - Texto.length <= Cero){
		return Texto;
	}else{
		var i;
		var Resultado = Texto;
		for ( i = Texto.length; i < Longitud; i++){
			Resultado = StringCero + Resultado;
		}
		return Resultado; 
	}
}