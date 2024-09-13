<template>
  <div class="video-background">
    <video autoplay muted loop>
      <source src="/amazonia.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <v-card v-if="airData" class="mx-auto" max-width="368">
      <v-card-title>
        {{ airData.city.name }}
        <template v-slot:subtitle> Índice de Qualidade do Ar (AQI): </template>
      </v-card-title>

      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h2" cols="6"> {{ airData.aqi }} </v-col>

          <v-col class="text-right" cols="6">
            <v-icon
              class="me-1 pb-1"
              :color="getAqiImage()"
              icon="mdi-alert"
              size="88"
            ></v-icon>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex py-3 justify-space-between">
        <v-list-item density="compact">
          <v-list-item-subtitle>
            <v-icon icon="mdi-weather-windy"></v-icon>
            {{ airData.iaqi.w.v }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact">
          <v-list-item-subtitle>
            <v-icon icon="mdi-water-percent"></v-icon>
            {{ airData.iaqi.h.v }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact">
          <v-list-item-subtitle>
            <v-icon icon="mdi-temperature-celsius"></v-icon>
            {{ airData.iaqi.t.v }}
          </v-list-item-subtitle>
        </v-list-item>
      </div>

      <v-expand-transition>
        <div v-if="expand">
          <v-list class="bg-transparent">
            <v-list-item>
              <p class="mb-2">
                <strong>Nível qualidade do ar considerado estavel: 35</strong>
              </p>
              <p>
                Descrição: <strong>{{ getAqiDescription() }}</strong>
              </p>
              <p>
                Poluente predominante:
                <strong>{{ airData.dominentpol }}</strong>
              </p>
              <p>
                Nivel de Poluição(PM2.5):
                <strong>{{ airData.iaqi.pm25.v }}</strong>
              </p>

              <v-btn
                class="mt-3"
                color="primary"
                :href="airData.city.url"
                target="_blank"
                size="small"
              >
                Site oficial
              </v-btn>
            </v-list-item>
          </v-list>
        </div>
      </v-expand-transition>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :text="!expand ? 'Ver Detalhes' : 'Ocultar Detalhes'"
          @click="expand = !expand"
        ></v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else class="mx-auto text-center" max-width="1200">
      <v-card-title class="text-h5"
        >Carregando dados sobre a qualidade do ar. Se não carregar, por favor,
        permita o acesso à localização do site.
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { fetchAirQuality } from "@/data/repository/buscaArRepository.js";

export default {
  data() {
    return {
      airData: null,
      expand: false,
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
      if (aqi <= 50) return "#008000";
      if (aqi <= 100) return "#eead2d";
      if (aqi <= 150) return "#ff6400";
      if (aqi <= 200) return "#ff0000";
      if (aqi <= 300) return "#800080";
      return "#5e2129";
    },
  },
};
</script>

<style>
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  background: url("path/to/your/placeholder-image.jpg") no-repeat;
  background-size: cover;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
}

.v-card-title {
  font-weight: bold;
}
.v-card {
  position: relative;
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
