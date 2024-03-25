import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  const regiaoInicialMapa = {
    latitude: -10,
    longitude: -55,
    /* Definição do zoom do mapa.
    Quanto menor, mais próximo o mapa fica.
    Quanto mair, mais longe o mapa fica.*/
    latitudeDelta: 40,
    longitudeDelta: 40,
  };
  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          mapType="hybrid"
          style={estilos.mapa}
          userInterfaceStyle="dark" //somente ios
          initialRegion={regiaoInicialMapa}
          maxZoomLevel={15}
          minZoomLevel={5}
        />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: { width: "100%", height: "100%" },
});
