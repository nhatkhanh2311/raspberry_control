import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import database from "@react-native-firebase/database";

const History = () => {
  const [history, setHistory] = useState({});

  const getData = () => {
    database()
      .ref("House")
      .child("faceDetect")
      .on("value", (snapshot) => {
        setHistory(snapshot.val());
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Lịch sử đăng nhập
      </Text>

      <FlatList data={Object.values(history)} renderItem={({item}) => <Text style={styles.item}>{item}</Text>}/>
    </View>
  );
}

export default History;

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
  item: {
    padding: 2,
    fontSize: 15,
    height: 40
  }
});
