<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

      <div class="modal" role="dialog" aria-describedby="modalDescription">

        <section id="modalDescription"></section>

        <button type="button" class="btn-close" @click="close" aria-label="Close modal">OK</button>

      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .modal {
    font-family: "Roboto";
    color: #676A6C;
    width: 320px;
    height: 350px;
    background: #FFFFFF;
    line-height: 1.3;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    border-radius: 15px;
    padding: 20px 10px;
  }

  .btn-close {
    font-family: "Roboto";
    font-size: 21px;
    background-color: #00A0D1;
    padding: 20px;
    border: 4px solid #00A0D1;
    border-radius: 5px;
    vertical-align: bottom;
    width: 150px;
    margin-top: 80px;
    color: white;
    outline: none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.3s;
    transition: 0.5s;
    z-index: 1;
  }
  .btn-close:after {
    position: absolute;
    opacity: 0;
    transition: 0.5s;
  }
  .btn-close:hover{
    background-color: #00799e;
    border: 4px solid #00799e;
  }
  .btn-close:hover:after {
    opacity: 1;
  }
  .btn-close:active {
    transform: scale(.95);
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>