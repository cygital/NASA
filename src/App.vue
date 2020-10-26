<template>
  <router-view/>
</template>
<style>
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body{
    padding: 0;
    margin: 0;
  }
  input, button {
    padding:1.3em;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
    color: #2c3e50;
  }
  .table{
    width: 100%;
    margin-bottom: 1em;
    color: #212529;
    border-collapse: collapse;
    margin-top: 1em;
  }
  .table td, .table th{
    padding: .75em;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  .table th{
    background:#fafafa;
    text-align: left;
  }
  .title{
    font-size:1.5em;
    border-bottom:solid 1px #ddd;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
  }
  .loading-indicator{
    color:#ffaa00;
    text-align: center;
    font-size: 2em;
  }
  .content-column{
    width: 100%;
    padding: 0.5em 1em;
  }
  @media (min-width: 48em){
    .content-column {
      width: 80%;
      margin-left: 20%;
      display: inline-block;
    }

  }
</style>
