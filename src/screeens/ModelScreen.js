import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Card from '../components/Card'
import PlatformTouchable from '../components/PlatformTouchable'
import { openDatabase } from "react-native-sqlite-storage";
import ModelDescriptionScreen from './ModelDescriptionScreen';

const db = openDatabase({
  name: "today-Task-sqlite",
});

const ModelScreen = ({ navigation }) => {

  const [searchWord, setSearchWord] = useState("");
  const [models, setModels] = useState([]);
  const [masterModelData, setmasterModelData] = useState([]);

  useEffect(() => {
    // createTables();
    getModelsData();
  }, []);


  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS model (id INTEGER PRIMARY KEY AUTOINCREMENT, code VARCHAR(20) , name VARCHAR(50),type  VARCHAR(50),cost INTEGER,category VARCHAR(20),desc VARCHAR(100),image VARCHAR(100) )`, [],
        (sqlTxn, res) => {
          console.log("model created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY AUTOINCREMENT, note VARCHAR(100),date DATE,details VARCHAR(100))`,
        [],
        (sqlTxn, res) => {
          console.log("note created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
    addModelAndNote();
  };


  const addModelAndNote = () => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO model (code,name,type,cost,category,desc,image) VALUES (?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?)`,
        ['Gt2000', 'Gt2000', 'Hello1', 2200, 'Printer HS', 'Digital Printer Device Gt2000 Gt2000 Hello1', 'Printer', 'Gt2000', 'Gt2000', 'Hello1', 2500, 'LCD', 'Digital LCD XS Device Gt2000 Gt2000 Hello1', 'LCD', 'Gt2000', 'Gt2000', 'Hello1', 6200, 'Laptops', 'Digital Laptops Device Gt2000 Gt2000 Hello1', 'Laptop', 'Gt2000', 'Gt2000', 'Hello1', 3200, 'Printer Inc', 'Digital Printer Inc Device Gt2000 Gt2000 Hello1', 'Printer-ink'],

        (sqlTxn, res) => {
          console.log("Model Data added successfully");
        },
        error => {
          console.log("error on adding model " + error.message);
        },
      );
      txn.executeSql(
        `INSERT INTO note (note,date,details) VALUES (?,?,?),(?,?,?)`,
        ['Jennifer Smith', '03.02.2021-15:00PM', 'This Item need to be checked', 'Jennifer Smith', '03.02.2021-15:00PM', 'This Item need to be checked'],

        (sqlTxn, res) => {
          console.log("Note Data added successfully");
        },
        error => {
          console.log("error on adding note " + error.message);
        },
      );
    });

  };

  const getModelsData = () => {

    db.transaction(txn => {

      txn.executeSql(

        `SELECT * FROM model`,
        [],
        (sqlTxn, res) => {
          console.log("model data retrieved successfully");
          let len = res.rows.length;
          console.log("Length", len);
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name, image: item.image, category: item.category });
            }
            setModels(results);
            setmasterModelData(results)
          }
        },
        error => {
          console.log("error on getting model data " + error.message);
        },
      );
    });
  };


  const searchFilterFunction = (text) => {

    if (text) {
      const newData = models.filter(function (item) {
        const itemData = item.category
          ? item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setModels(newData);
      setSearchWord(text);
    } else {
      setModels(masterModelData);
      setSearchWord(text);
    }
  };


  const _renderItem = ({ item }) => {
    // var x = id = 1 ? item.image : ""

    return (
      item.id == 1 ? (
        <TouchableOpacity onPress={() => navigation.navigate(ModelDescriptionScreen)}>
          <Card
            key={item.id}
            style={{
              margin: 10,
              width: cardWidth,
              height: 140,
              backgroundColor: 'white',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={require('../assets/imgs/Printer.png')} />

          </Card>
          <Text style={{ alignSelf: 'center', marginBottom: 10, fontSize: 16, fontWeight: '500' }}>{item.category}</Text>

        </TouchableOpacity>
      ) : (
        <View>
          <Card
            key={item.id}
            style={{
              margin: 10,
              width: cardWidth,
              height: 140,
              backgroundColor: 'white',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={require('../assets/imgs/Printer.png')} />
          </Card>
          <Text style={{ alignSelf: 'center', marginBottom: 10, fontSize: 16, fontWeight: '500' }}>{item.category}</Text>
        </View>
      )
    )
  }

  const cardGap = 20;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            paddingRight: 10,
            flexDirection: 'row',
            paddingHorizontal: 8,
            backgroundColor: '#F0F0F0',
            height: 53,
            width: 360,
            alignSelf: 'center',
            borderRadius: 50,
            textAlign: 'left',
            marginTop: 35,
            fontSize: 18,
            fontStyle: 'bold',
            borderColor: 'hidden',
            elevation: 5,
            fontSize: searchWord ? 18 : 17,
          }}
          autoCorrect={false}
          textAlign='left'
          placeholder='type to search...'
          placeholderTextColor="#B4B4B4"
          onChangeText={searchFilterFunction}
          value={searchWord}
        />
        <Image source={require('../assets/icon/Group.png')} style={{
          position: 'absolute',
          right: 49,
          top: 50
        }} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10
        }}
      >
        <FlatList
          data={models}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />


      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    // marginTop: 20,

  }

})

export default ModelScreen
