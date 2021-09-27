import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedbackBase, Animated } from 'react-native';

// icons
import { Ionicons } from '@expo/vector-icons';


// IMAGES
import profile from './assets/rdg.png'

export default function App() {

  const [currentTab, setCurrentTab] = React.useState('Home')
  const [showMenu, setShowMenu] = React.useState(false)

  const offSetValue = React.useRef(new Animated.Value(0)).current
  const scaleValue = React.useRef(new Animated.Value(1)).current
  const closeButtonOffSet = React.useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center', padding: 20 }}>

        <Image
          source={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            margin: 8
          }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", marginTop: 20 }}>Rodrigo Elyel</Text>

        <TouchableOpacity>
          <Text style={{ marginTop: 8, color: "white" }}>View Profile</Text>
        </TouchableOpacity>



        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {/* tab bar buttons */}

          {TabButton(currentTab, setCurrentTab, "Home", "ios-home-outline")}
          {TabButton(currentTab, setCurrentTab, "Search", "ios-search-outline")}
          {TabButton(currentTab, setCurrentTab, "Notifications", "ios-notifications-outline")}
          {TabButton(currentTab, setCurrentTab, "Settings", "ios-settings-outline")}



        </View>

        <View style={{}}>
          {TabButton(currentTab, setCurrentTab, "LogOut", "ios-exit-outline")}
        </View>

      </View>


      {/* Overlay view ... */}

      <Animated.View style={{
        flexGrow: 1,
        alignItems: 'flex-start',
        backgroundColor: "white",
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // transforming View
        transform: [
          { scale: scaleValue },
          { translateX: offSetValue }
        ]
      }}>

        {/* Menu button ... */}



        <Animated.View style={{
          width: '100%',
          height: '100%',
          transform: [
            { translateY: closeButtonOffSet }
          ]

        }}>

          <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
            // Animated
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            }).start()

            Animated.timing(offSetValue, {
              toValue: showMenu ? 0 : 220,
              duration: 300,
              useNativeDriver: true
            }).start()

            Animated.timing(closeButtonOffSet, {
              toValue: !showMenu ? -50 : 0,
              duration: 300,
              useNativeDriver: true
            }).start()

            setShowMenu(!showMenu)
            console.log(showMenu)
          }}>
            <Ionicons name={showMenu ? "ios-close-outline" : "ios-menu-outline"} size={40} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 20, paddingLeft: 4 }}>{currentTab}</Text>


          <Image
            source={profile}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 15,
              marginTop: 20,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 15, paddingBottom: 8 }}>Rodrigo Elyel Costa Batista</Text>
          <Text >Desenvolvedor mobile front-end</Text>

        </Animated.View>


      </Animated.View>

    </SafeAreaView>
  );
}

const TabButton = (currentTab, setCurrentTab, title, icon) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title === "LogOut") {
        console.log("Sair")
      } else {
        setCurrentTab(title)
      }
    }}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 8,
        backgroundColor: currentTab === title ? "white" : "transparent",
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <Ionicons name={icon} size={24} color={currentTab === title ? "#5B0078" : "white"} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, color: currentTab === title ? "#5B0078" : "white" }}>{title}</Text>

      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B0078',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
