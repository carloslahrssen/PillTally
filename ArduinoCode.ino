/*
Connect one end of FSR to power, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground
Based on: http://tinyurl.com/y7jd4wzz
*/
 
int fsrPinSun = 0;// the FSR and 10K pulldown are connected to a0
int fsrPinThurs = 1; // same but the other one too
int fsrReadingSun;     // the analog reading from the FSR resistor divider
int fsrReadingThurs;
  
//days of the week and corresponding pins
int redSunday = 9;
int redMonday = 1;
int redTuesday = 2;
int redWednesday = 3;
int redThursday = 4;
int redFriday = 5;
int redSaturday = 6;
int greenSunday = 7;
int greenThursday = 8;

int thisDay = 0; //indicates the day begining with sunday at 0 and ending with saturday at 6
 
void setup(void) {
  // sends debugging information via the Serial monitor
  Serial.begin(9600);
  pinMode(fsrPinSun, INPUT);
  pinMode(fsrPinThurs, INPUT);
  for(int pin = 0; pin < 10; pin++){
    pinMode(pin, OUTPUT);
  }
  for(int pin = 0; pin < 7; pin++){
    digitalWrite(pin, HIGH);
    digitalWrite(9, HIGH);
  }
}
 
void loop(void) {
  fsrReadingSun = analogRead(fsrPinSun);
  fsrReadingThurs = analogRead(fsrPinThurs);  
 
  //Serial.print("Analog reading = "); *for testing purposes
  //Serial.print(fsrReading);     // the raw analog reading *for testing purposes
 
  // If there is pressure the capsule is assumed full
  if (fsrReadingSun < 10 && thisDay == 0) {
    Serial.println("SE");
  }if(fsrReadingSun >= 10){
    Serial.println("SF");
  }if(fsrReadingThurs < 10 && thisDay == 4){
    Serial.println("TE");
  }if(fsrReadingThurs >= 10){
    Serial.println("TF");
  }else{
    Serial.println("");
  }
  delay(100);
  
  
  
  //For loop to set lights to red if full on wrong day, or empty on wrong day or right day,
  //and green if correct day and full
  //Days 0 to 7 are red, 8 - 13 would be green days of the week
  
  if(thisDay == 0 && fsrReadingSun >= 10){
      digitalWrite(greenSunday, HIGH);
      digitalWrite(redSunday, LOW);
    }
    //if(thisDay == 1 && fsrReading >= 10){
    //  digitalWrite(greenMonday, HIGH);
    //}  
    //if(thisDay == 2 && fsrReading >= 10){
    //  digitalWrite(greenTuesday, HIGH);
    //}
    //if(thisDay == 3 && fsrReading >= 10){
    //  digitalWrite(greenWednesday, HIGH);
    //}J 9
    else if(thisDay == 4 && fsrReadingThurs >= 10){
      digitalWrite(greenThursday, HIGH);
      digitalWrite(redThursday, LOW);
    }
    //if(thisDay == 5 && fsrReading >= 10){
    //  digitalWrite(greenFriday, HIGH);
    //}
    //if(thisDay == 6 && fsrReading >= 10){
    //  digitalWrite(greenSaturday, HIGH);
    //}
    else
    {
      for(int num = 0; num < 7; num++){
      digitalWrite(num, HIGH);
      digitalWrite(num+7, LOW);
      if(num==6){
         digitalWrite(9, HIGH);
      }
      }
    }
} 
