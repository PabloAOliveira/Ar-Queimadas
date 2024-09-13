<template>
  <v-app>
    <v-row class="fill-height d-flex justify-center align-center">
      <v-col>
        <v-card v-if="airData" class="mx-auto" max-width="500" height="400">
          <v-card-title class="text-h5">
            Qualidade do Ar em {{ airData.city.name }}
          </v-card-title>

          <v-card-subtitle> Índice de Qualidade do Ar (AQI): </v-card-subtitle>

          <v-card>
            <div class="image-container d-flex align-center justify-center">
              <v-img
                :src="getAqiImage()"
                class="background-image"
                max-width="150"
              >
                <div class="aqui-number">
                  <span>{{ airData.aqi }}</span>
                </div>
              </v-img>
            </div>

            <v-card-text class="text-center">
              <p>
                Descrição: <strong>{{ getAqiDescription() }}</strong>
              </p>
              <p>
                Poluente predominante:
                <strong>{{ airData.dominentpol }}</strong>
              </p>
              <p>
                PM2.5: <strong>{{ airData.iaqi.pm25.v }}</strong>
              </p>
              <p>
                Temperatura: <strong>{{ airData.iaqi.t.v }} °C</strong>
              </p>
              <p>
                Humidade: <strong>{{ airData.iaqi.h.v }}%</strong>
              </p>
              <p>
                Vento: <strong>{{ airData.iaqi.w.v }} m/s</strong>
              </p>
            </v-card-text>
          </v-card>

          <v-card-actions>
            <v-btn
              color="red-lighten-2"
              :href="airData.city.url"
              target="_blank"
            >
              Mais informações
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else class="mx-auto text-center" max-width="1150">
          <v-card-title class="text-h5"
            >Carregando dados da qualidade do ar. Caso não seja possível
            carregar, permita a localização do site.
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { fetchAirQuality } from "@/data/repository/buscaArRepository.js";
import greenImg from "../assets/green.png";
import moderateYellowImg from "../assets/moderate-yellow.png";
import sensitiveGroupsOrangeImg from "../assets/sensititvegroups-orange.png";
import redImg from "../assets/red.png";
import verypunkroxo from "../assets/verypunkroxo.png";
import ultraredPiorDeTodosImg from "../assets/ultraredpiordetodos.png";

export default {
  data() {
    return {
      airData: null,
    };
  },
  mounted() {
    this.loadAirQualityData();
  },
  methods: {
    async loadAirQualityData() {
      try {
        this.airData = await fetchAirQuality();
      } catch (error) {
        console.error("Erro ao carregar dados de qualidade do ar:", error);
      }
    },
    getAqiDescription() {
      const aqi = this.airData.aqi;
      if (aqi <= 50) return "Bom";
      if (aqi <= 100) return "Moderado";
      if (aqi <= 150) return "Não saudável para grupos sensíveis";
      if (aqi <= 200) return "Não saudável";
      if (aqi <= 300) return "Muito não saudável";
      return "Perigoso";
    },
    getAqiImage() {
      const aqi = this.airData.aqi;
      if (aqi <= 50) return greenImg;
      if (aqi <= 100) return moderateYellowImg;
      if (aqi <= 150) return sensitiveGroupsOrangeImg;
      if (aqi <= 200) return redImg;
      if (aqi <= 300) return verypunkroxo;
      return ultraredPiorDeTodosImg;
    },
  },
};
</script>

<style>
.v-card-title {
  font-weight: bold;
}
.v-img {
  margin-top: 20px;
}
.image-container {
  position: relative;
  display: inline-block;
}
.background-image {
  width: 150px;
  height: 50px;
  object-fit: cover;
}
.aqui-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
</style>
