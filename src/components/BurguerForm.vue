<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form class="burgerForm" @submit.prevent="createBurger">
        <div class="burgerForm__input">
          <label for="nome">Nome do Cliente:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu nome"
          />
        </div>

        <div class="burgerForm__input">
          <label for="pao">Escolha o pão:</label>
          <select name="pao" id="pao" v-model="pao">
            <option value="">Selecione o seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }}
            </option>
          </select>
        </div>

        <div class="burgerForm__input">
          <label for="carne">Escolha a carne do seu Burger:</label>
          <select name="carne" id="carne" v-model="carne">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>

        <div class="burgerForm__checkbox burgerForm__input">
          <label class="burgerForm__opcionais" for="opcionais"
            >Selecione os opcionais:</label
          >
          <div
            v-for="opcional in opcionaisData"
            :key="opcional.id"
            class="burgerForm__checkboxOpcionais"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="opcionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>

        <div class="burgerForm__input">
          <input
            type="submit"
            class="burgerForm__btn"
            value="Criar meu Burger!"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: "BurgerForm",
  components: { Message },
  data() {
    return {
      paes: null,
      carnes: null,
      opcionaisData: null,
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null,
    };
  },

  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();

      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisData = data.opcionais;
    },

    async createBurger(e) {
      // e.preventDefault(); já foi usado na tag form através do comando @submit.prevent

      const data = {
        nome: this.nome,
        pao: this.pao,
        carne: this.carne,
        opcionais: Array.from(this.opcionais),
        status: "Solicitado"
      }

      const dataJson = JSON.stringify(data);

      const req = await fetch('http://localhost:3000/burgers', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: dataJson
      });

      const res = await req.json();

      // Colocar uma mensagem no sistema

      this.msg = `Pedido nº${res.id} de ${res.nome} enviado com sucesso!`;

      // Limpar mensagem

      setTimeout(() => this.msg = '', 3000);

      console.log(res);

      this.nome = '';
      this.pao = '';
      this.carne = '';
      this.opcionais = '';
    }
  },

  mounted() {
    this.getIngredientes();
  },
};
</script>

<style scoped>
.burgerForm {
  margin: 0 auto;
  max-width: 400px;
}

.burgerForm__input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

.burgerForm__checkbox {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.burgerForm__opcionais {
  width: 100%;
}

.burgerForm__checkboxOpcionais {
  flex-direction: row;
  flex-wrap: wrap;
}

.burgerForm__checkboxOpcionais span,
.burgerForm__checkboxOpcionais input {
  width: auto;
}

.burgerForm__checkbox span {
  margin-left: 6px;
  font-weight: bold;
}

.burgerForm__btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.burgerForm__btn:hover {
  background-color: transparent;
  color: #222;
}
</style>