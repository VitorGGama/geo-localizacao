import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  /* State para monitorar dados da atualização atual do usuário.
  Inicialmente, nulo.*/
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      /* Acessando o status da requisição de permissão de uso
      dos recursos de geolocalização.*/
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Se o status NÃO FOR liberado/permitido, então será dado um alerta
      notificando o usuário*/
      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o uso de geolocalização");
        return;
      }

      /* Se o status estiver ok, obtemos os dados da localização
      atual. E atualizamos o state da minhaLocalização.*/
      let localizacaoAtaul = await Location.getCurrentPositionAsync({});

      setMinhaLocalizacao(localizacaoAtaul);
    }
    obterLocalizacao();
  }, []);
  console.log(minhaLocalizacao);

  const [localizacao, setLocalizacao] = useState({
    latitude: -33.867886,
    longitude: -63.987,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const regiaoInicialMapa = {
    latitude: -23.533773,
    longitude: -46.65529,

    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  const marcaLocal = (event) => {
    setLocalizacao({
      ...localizacao,

      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <View style={estilos.viewBotao}>
          <Button title="Onde estou?" onPress={marcaLocal} />
        </View>

        <View style={estilos.viewMapa}>
          <MapView
            style={estilos.mapa}
            initialRegion={regiaoInicialMapa}
            mapType="standard"
          >
            <Marker coordinate={localizacao}>
              {/* Ícone personalizado */}
              <Image source={require("./assets/ghost.png")} />
            </Marker>
          </MapView>
        </View>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapa: {
    width: "100%",
    height: "100%",
  },
});
