import { StyleSheet, Text, View } from 'react-native';
import NoteScreen from './app/screens/NoteScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/context/NoteProvider';
import colours from './app/misc/colours';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <NoteProvider>
          <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true, headerTintColor: colours.LIGHT }}>
            <Stack.Screen component={NoteScreen} name="NoteList" />
            <Stack.Screen component={NoteDetail} name="NoteDetails" />
          </Stack.Navigator>
        </NoteProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
