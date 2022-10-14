import {StyleSheet, Text, View, Modal, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {GStyles} from './GlobalStyle';
import {AppColors} from 'assets/AppColors';
import {Width} from './AppHeader';
import {ActivityIndicator} from 'react-native-paper';

export const Loader = ({text = 'Loading', visible = false}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>{text} </Text>
          <ActivityIndicator />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: AppColors.white2,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Width * 0.8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: AppColors.DarkGrey,
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
