import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Switch, Text, View, Vibration } from "react-native";
import database from "@react-native-firebase/database";

const Home = () => {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [tem, setTem] = useState(0);
  const [led, setLed] = useState(false);
  const toggleLed = () => setLed(!led);

  const getData = () => {
    database()
      .ref("House")
      .child("temperature")
      .on("value", (snapshot) => {
        setTem(snapshot.val());
        if (snapshot.val() > 35) {
          Vibration.vibrate(3000);
        }
      });

    database()
      .ref("House")
      .child("led")
      .on("value", (snapshot) => {
        setLed(snapshot.val() === "on");
      });
  }

  const toggle = () => {
    database()
      .ref("House")
      .update({ led: led ? "off" : "on" })
      .then((res) => {
        toggleLed();
      });
  }

  useEffect(() => {
    getData();
    setInterval(() => {
      let temp = new Date();
      setDay(temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear());
      setTime(String(temp.getHours()).padStart(2, '0') + ':' + String(temp.getMinutes()).padStart(2, '0') + ':' + String(temp.getSeconds()).padStart(2, '0'));
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Hệ thống nhà thông minh
      </Text>

      <Text style={styles.daytime}>
        {day}
      </Text>

      <Text style={styles.daytime}>
        {time}
      </Text>

      <View style={styles.led}>
        <View style={{flex: 1, marginLeft: 10, flexDirection: "row"}}>
          <Image style={{height: 40, width: 40, marginRight: 10}} source={require("../assets/lamp.png")}/>
          <Text style={{fontSize: 30}}>
            Bật đèn
          </Text>
        </View>
        <Switch style={{transform: [{scaleX: 1.8}, {scaleY: 1.8}], marginRight: 20}}
                trackColor={{false: "black", true: "white"}} thumbColor={"white"} onValueChange={toggle} value={led}/>
      </View>

      <View style={styles.tem}>
        <View style={{flex: 1, marginLeft: 10, flexDirection: "row"}}>
          <Image style={{height: 40, width: 40, marginRight: 10}} source={require("../assets/hot.png")}/>
          <Text style={{fontSize: 30}}>
            Nhiệt độ
          </Text>
        </View>
        <Text style={{flex: 1, fontSize: 30, marginRight: 10, textAlign: 'right', color: tem > 35 ? 'red' : 'green'}}>
          {tem}°C
        </Text>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3dbff',
    alignItems: 'center',
    height: '100%'
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 50
  },
  daytime: {
    fontSize: 30
  },
  led: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 50
  },
  tem: {
    flexDirection: 'row',
    marginBottom: 20
  }
});
