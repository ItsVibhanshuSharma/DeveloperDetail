import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useScreenDimensions} from '../shared/theme/ScreenDimensionsContext';
import {colors} from '../shared/theme/colors';
import {ConstantText} from '../shared/constant';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedTarget, setList, setIsFocus} from '../slice/homeSlice';
import {fonts, getFontSize, screenHeight} from '../shared/theme/fonts';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
export default function HomeScreen({navigation, routes}: any) {
  const {screenWidth} = useScreenDimensions();
  const {selectedData, list, isFocus} = useSelector(
    (state: any) => state.homeSlice,
  );
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: '',
    designation: '',
    salary: '',
    search: '',
  });
  const designationOptions = [
    {label: 'Web Developer', value: 'Web Developer'},
    {label: 'FrontEnd Developer', value: 'FrontEnd Developer'},
    {label: 'Mobile App Developer', value: 'Mobile App Developer'},
  ];
  const handleForm = (type: string) => {
    dispatch(setSelectedTarget(type));
  };
  const handleSubmit = () => {
    if (state.name && state.designation && state.salary) {
      const newList = [...list, state];
      dispatch(setList(newList));
      setState({name: '', designation: '', salary: '', search: ''});
    }
  };
  const handleDelete = (index: any) => {
    const updatedList = list.filter((_, i) => i !== index);
    dispatch(setList(updatedList));
  };

  const filteredList = list.filter(
    item =>
      item.salary.toLowerCase().includes(state.search.toLowerCase()) ||
      item.designation.toLowerCase().includes(state.search.toLowerCase()) ||
      item.name.toLowerCase().includes(state.search.toLowerCase()),
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: screenWidth,
      backgroundColor: colors.backgroundColor,
    },
    selectedWrap: {
      height: 54,
      width: screenWidth - 32,
      borderRadius: 32,
      marginTop: 50,
      backgroundColor: colors.backgroundMain,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
    },
    selectedSubWrap: {
      height: 42,
      backgroundColor: colors.selectedBg,
      width: (screenWidth - 72) / 2,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedTxt: {
      fontSize: getFontSize(16),
      fontFamily: fonts.openSansMedium5,
    },
    input: {
      marginTop: 30,
    },
    searchBar: {
      marginTop: 20,
      marginBottom: 20,
    },
    btnTxt: {
      fontSize: getFontSize(15),
      color: colors.white,
      marginTop: 4,
    },
    listItem: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      borderRadius: 4,
      marginTop: 10,
    },
    wrapper: {
      width: screenWidth - 32,
      backgroundColor: colors.wrapper,
      paddingHorizontal: 20,
      paddingVertical: 20,
      height: screenHeight / 1.3,
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    divider: {
      width: screenWidth - 32,
      borderBottomWidth: 1,
      borderBottomColor: colors.selectedBg,
      marginTop: 10,
    },
    submitBtn: {
      height: 42,
      backgroundColor: colors.selectedBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      borderRadius: 20,
      marginBottom: 20,
    },
    deleteBtn: {
      justifyContent: 'flex-end',
      padding: 5,
      backgroundColor: colors.deleteBtn,
      borderRadius: 4,
      marginTop: 4,
    },
    dropdownStyle: {
      height: 50,
      borderColor: isFocus ? 'blue' : '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      backgroundColor: 'white',
      marginTop: 20,
    },

    dropdownTextStyle: {
      fontSize: 16,
    },
    placeholderStyle: {
      color: '#aaa',
      fontSize: 16,
    },
    selectedTextStyle: {
      color: '#333',
      fontSize: 16,
    },
  });

  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.btnTxt}>{index + 1}</Text>
            </View>
            <View style={{marginStart: 5}}>
              <Text style={styles.btnTxt}>Name: {item.name}</Text>
              <Text style={styles.btnTxt}>Designation: {item.designation}</Text>
              <Text style={styles.btnTxt}>Salary: {item.salary}</Text>
            </View>
          </View>
          <Pressable
            style={styles.deleteBtn}
            onPress={() => handleDelete(index)}>
            <Text style={[styles.btnTxt, {marginTop: 0}]}>
              {ConstantText.delete}
            </Text>
          </Pressable>
        </View>

        {index < list.length - 1 && <View style={styles.divider} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.backgroundColor}
        animated={true}
        translucent={true}
        showHideTransition={'slide'}
      />

      {selectedData === 'List' ? (
        <View style={{marginVertical: 10,width:screenWidth-32,marginTop:80}}>
          <Dropdown
            style={[styles.dropdownStyle, {marginTop: 0}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={designationOptions}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Filter by Designation' : '...'}
            value={state.search}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setState(prevState => ({
                ...prevState,
                search: item.value, // Update the search field with selected designation
              }));
              setIsFocus(false);
            }}
          />
        </View>
      ) : null}

      <View style={[styles.selectedWrap,{
        marginTop:   selectedData == 'Form' ?  50 : 20 
      }]}>
        <Pressable
          style={[
            styles.selectedSubWrap,
            {
              backgroundColor:
                selectedData == 'Form' ? colors.selectedBg : colors.transparent,
            },
          ]}
          onPress={() => handleForm('Form')}>
          <Text
            style={[
              styles.selectedTxt,
              {
                color:
                  selectedData == 'Form' ? colors.white : colors.selectedTxt,
              },
            ]}>
            {ConstantText.form}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.selectedSubWrap,
            {
              backgroundColor:
                selectedData == 'List' ? colors.selectedBg : colors.transparent,
            },
          ]}
          onPress={() => handleForm('List')}>
          <Text
            style={[
              styles.selectedTxt,
              {
                color:
                  selectedData == 'List' ? colors.white : colors.selectedTxt,
              },
            ]}>
            {ConstantText.list}
          </Text>
        </Pressable>
      </View>
      <View style={{marginTop: 20}}>
        {selectedData == 'Form' ? (
          <View style={styles.wrapper}>
            <View>
              <TextInput
                mode="flat"
                label="Name"
                value={state.name}
                onChangeText={text =>
                  setState(prevState => ({
                    ...prevState,
                    name: text,
                  }))
                }
                style={styles.input}
              />
              <Dropdown
                style={styles.dropdownStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={designationOptions}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Designation' : '...'}
                value={state.designation}
                onFocus={() => dispatch(setIsFocus(true))}
                onBlur={() => dispatch(setIsFocus(false))}
                onChange={item => {
                  setState(prevState => ({
                    ...prevState,
                    designation: item.value,
                  }));
                  dispatch(setIsFocus(false));
                }}
              />
              <TextInput
                mode="flat"
                label="Salary"
                value={state.salary}
                onChangeText={text =>
                  setState(prevState => ({
                    ...prevState,
                    salary: text,
                  }))
                }
                style={styles.input}
                keyboardType='phone-pad'
              />
            </View>
            <View>
              <Pressable
                onPress={() => handleSubmit()}
                style={styles.submitBtn}>
                <Text style={styles.btnTxt}>Submit</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <TextInput
                mode="flat"
                label="Search"
                value={state.search}
                onChangeText={text =>
                  setState(prevState => ({
                    ...prevState,
                    search: text,
                  }))
                }
                style={styles.searchBar}
              />
            </View>
            <View style={[styles.wrapper, {height: screenHeight / 1.8}]}>
              <FlatList
                data={filteredList.length > 0 ? filteredList : list} 
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={{flexGrow: 0}}
                bounces={false}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
