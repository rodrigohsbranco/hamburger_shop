<template>
  <div class="burgerTable">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div class="burgerTable__header">
        <div class="burgerTable__orderId">#:</div>
        <div>Cliente</div>
        <div>Pão:</div>
        <div>Carne</div>
        <div>Opcionais</div>
        <div>Ações</div>
      </div>

      <div class="burgerTable__rows">
        <div class="burgerTable__row" v-for="burger in burgers" :key="burger.id">
          <div class="burgerTable__orderNumber">{{ burger.id }}</div>
          <div>{{ burger.nome }}</div>
          <div>{{ burger.pao }}</div>
          <div>{{ burger.carne }}</div>
          <div>
            <ul>
              <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
            </ul>
          </div>
          <div>
            <select name="status" class="burgerTable__status" @change="updateBurger($event, burger.id)">
              <option value="">Selecione</option>
              <option v-for="s in status" :key="s.id" :value="s.tipo" :selected='burger.status == s.tipo'>{{ s.tipo }}</option>
            </select>
            <button class="burgerTable__deleteBtn" @click="deleteBurger(burger.id)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: "Dashboard",

  components: { Message },

  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null
    }
  },

  methods: {
    async getPedidos() {

      const req = await fetch('http://localhost:3000/burgers')

      const data = await req.json();

      this.burgers = data;

      // resgatar os status

      this.getStatus();
    },

    async getStatus() {
      const req = await fetch('http://localhost:3000/status');

      const data = await req.json();

      this.status = data;
    },

    async deleteBurger(id) {
      
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: 'DELETE'
      });

      const res = await req.json();

      // Colocar uma mensagem no sistema

      this.msg = `Pedido nº${id} foi cancelado com sucesso!`;

      // Limpar mensagem

      setTimeout(() => this.msg = '', 3000);

      console.log(res);

      this.getPedidos();
    },

    async updateBurger(event, id) {

      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option });

      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: dataJson
      });

      const res = await req.json();

      // Colocar uma mensagem no sistema

      this.msg = `O pedido Nº ${res.id} de ${res.nome} foi atualizado para ${res.status}!`;

      // Limpar mensagem

      setTimeout(() => this.msg = '', 3000);

      console.log(res);
    }
  },

  mounted() {
    this.getPedidos();
  }
};
</script>

<style scoped>
.burgerTable {
  margin: 0 auto;
  max-width: 1200px;
}

.burgerTable__header,
.burgerTable__rows,
.burgerTable__row {
  display: flex;
  flex-wrap: wrap;
}

.burgerTable__header {
  border-bottom: 3px solid #333;
  font-weight: bold;
  padding: 12px;
}

.burgerTable__row {
  border-bottom: 1px solid #ccc;
  padding: 12px;
  width: 100%;
}

.burgerTable__header div,
.burgerTable__row div {
  width: 19%;
}

.burgerTable__header .burgerTable__orderId,
.burgerTable__row .burgerTable__orderNumber {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.burgerTable__deleteBtn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.burgerTable__deleteBtn:hover {
  background-color: transparent;
  color: #222;
}
</style>