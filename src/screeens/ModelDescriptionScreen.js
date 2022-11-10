import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native'
import Card from '../components/Card';
import { openDatabase } from "react-native-sqlite-storage";
import Accordion from '../components/Accordion';


const db = openDatabase({
    name: "today-Task-sqlite",
});

const ModelDescriptionScreen = () => {

    const [models, setModels] = useState([]);
    const [notes, setNotes] = useState([]);
    const [masterModelData, setmasterModelData] = useState({});
    const [insertedNote, setInsertedNote] = useState();


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

    saveNoteHandler = () => {

        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO note (note,date,details) VALUES (?,?,?)`,
                ['Mohamed Abdullatif', Date(Now), insertedNote],
                (sqlTxn, res) => {
                    console.log("Note Inserted successfully");
                },
                error => {
                    console.log("error on inserting note " + error.message);
                },
            );
        });

    }

    const getModelsData = () => {

        db.transaction(txn => {

            txn.executeSql(

                `SELECT * FROM model WHERE id=1`,
                [],
                (sqlTxn, res) => {
                    console.log("model data retrieved successfully");
                    let len = res.rows.length;
                    console.log("Length", len);
                    if (len > 0) {
                        let results = [];
                        // for (let i = 0; i < len; i++) {
                        let item = res.rows.item(0);
                        results.push({ id: item.id, code: item.code, name: item.name, cost: item.cost, type: item.type, desc: item.desc, image: item.image, category: item.category });
                        // }

                        setModels(results);
                        setmasterModelData(results[0])
                    }
                },
                error => {
                    console.log("error on getting model data " + error.message);
                },
            );
        });
    };

    const getNoteData = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM note`,
                [],
                (sqlTxn, res) => {
                    console.log("note data retrieved successfully");
                    let len = res.rows.length;
                    console.log("Length", len);
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item.id, note: item.note, date: item.date, details: item.details });
                        }
                        setNotes(results);
                    }
                },
                error => {
                    console.log("error on getting model data " + error.message);
                },
            );
        });
    };
    const _renderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 5, padding: 10 }}>

                <Text>{item.note}</Text>
                <Text>{item.date}</Text>
                <Text>{item.details}</Text>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30, }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: '#DEDEDE', justifyContent: 'center', alignContent: 'center' }} />
                </View> */}
            </View>
        );
    }

    useEffect(() => {
        // createTables();
        getModelsData();
        getNoteData();
    }, []);


    useEffect(() => {
        console.log("masterModelData", masterModelData);
    }, [masterModelData]);

    const cardGap = 16;
    const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={{
                    alignSelf: 'center',
                    width: 350,
                    // height: 880,
                    marginBottom: 50,
                    paddingBottom: 30,
                    backgroundColor: '#EAEAEA',
                    borderRadius: 50,
                    elevation: 0.5,
                    marginVertical: 20,
                    paddingHorizontal: 10
                }}>

                    <Card
                        style={{
                            marginTop: cardGap,
                            width: 250,
                            height: 163,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            borderRadius: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image source={require('../assets/imgs/Printer.png')} />
                    </Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30, }}>
                        <View style={{ flex: 1, height: 2, backgroundColor: '#DEDEDE', justifyContent: 'center', alignContent: 'center' }} />
                    </View>
                    <Accordion title="Image Info" >
                        <View style={styles.section}>
                            {/* <Text style={styles.sectionTitle}>Image Info</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.title}>Model</Text>
                                <Text style={styles.codeValue}>{masterModelData?.code}</Text>
                            </View>

                            {/* <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={styles.title}>Model</Text>
                        <Text style={styles.codeValue}>{models[0].code}</Text>
                    </View> */}

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={styles.title}>Model Name</Text>
                                <Text style={styles.codeValue}>{masterModelData?.name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={styles.title}>Model Type</Text>
                                <Text style={styles.codeValue}>{masterModelData?.type}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={styles.title}>Cost</Text>
                                <Text style={styles.codeValue}>{masterModelData?.cost}$</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={styles.title}>Category</Text>
                                <Text style={styles.codeValue}>{masterModelData?.category}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={styles.title}>Additional Description</Text>
                                <Text style={styles.codeValue}>{masterModelData?.desc}</Text>
                            </View>
                        </View>
                    </Accordion>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, }}>
                        <View style={{ flex: 1, height: 2, backgroundColor: '#DEDEDE', justifyContent: 'center', alignContent: 'center' }} />
                    </View>


                    <View style={styles.noteSection}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <View>
                            <TouchableOpacity onPress={saveNoteHandler}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10, paddingLeft: 50 }}>
                                    <Image source={require('../assets/icon/save-icon-gray.png')} style={{ width: 12.7, height: 12.7, marginRight: 8 }} />
                                    <Text style="btnTitle">save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Add a Note' value={insertedNote} onChangeText={(insertedNote) => setInsertedNote(insertedNote)} style={styles.input} />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ color: '#4E4E4E', fontSize: 15 }}>History Notes</Text>
                        </View>

                        <View style={{
                            // marginTop: 15,
                            // width: 312,
                            // height: 112,
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#FFFFFF'
                        }}>

                            <FlatList
                                data={notes}
                                renderItem={_renderItem}
                                keyExtractor={item => item.id}
                            />

                        </View>

                    </View>



                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    sectionTitle: {
        color: '#4E4E4E',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },
    section: {
        padding: 20
    },
    title: {
        flex: 3,
        color: '#4E4E4E',
        fontSize: 15
    },
    codeValue: {
        flex: 1,
        color: '#4E4E4E',
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    input: {
        width: 312,
        height: 38,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 9,
    },
    noteSection: {
        justifyContent: 'center'
    }
});

export default ModelDescriptionScreen