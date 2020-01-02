import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listContainer:{
        padding: 10,
        fontSize:14,
        color:"#000"
    }
})

function ItemText({ item }) {
    return (
      <View style={styles.listContainer}>
        <Text>{item.name}</Text>
        <Text>{item.phoneNumber}</Text>
      </View>
    );
}

class VendorList extends Component{
    constructor (props) {
        super (props)
        this.state = {
            list : []
        }
    }

    componentDidMount () {
        this.getList()
    }

    getList () {
        console.log("get data")
        fetch('http://192.168.1.186:3000/vendor/all')
        .then( resp => resp.json())
        .then( (result)=> {
            console.log("result", result)
            this.setState ({
                list : result
            })
        }).catch(error => {
            console.log("error::", error);
        })
    }

    render () {
        const Itemlist = this.state.list;
        console.log("data::", Itemlist)
        console.log("dummy")
        return (
            <View>
                <FlatList
                    data={Itemlist}
                    renderItem={({ item}) => <ItemText item={item} />}
                    keyExtractor={item => item._id}
                />
            </View>
        )
    }   
}

export default VendorList;