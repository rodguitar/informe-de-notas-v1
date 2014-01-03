<?php
/*
Plugin Name: Informe de Notas
Plugin URI: http://www.ecologico.cl
Description: Plugin para gestion de notas de colegio ecologico san felipe.
Author: Tecnologias Web 2.0 Uach
Author URI: 
Version: 1.0
License: GPLv2
*/


// Creamos el menú con un submenú con add_menu_page y add_submenu_page



function your_css_and_js() {
//wp_register_style('bootstrap', plugins_url('bootstrap/css/bootstrap.min.css',__FILE__ ));
//wp_enqueue_style('bootstrap');

wp_register_script( 'jquery-2.0.3', plugins_url('jquery-2.0.3.js',__FILE__ ));
wp_enqueue_script('jquery-2.0.3');

wp_register_script( 'funciones', plugins_url('funciones.js',__FILE__ ));
wp_enqueue_script('funciones');

wp_register_script( 'bootstrap.min', plugins_url('bootstrap/js/bootstrap.min.js',__FILE__ ));
wp_enqueue_script('bootstrap.min');

}

add_action( 'wp_head','your_css_and_js');




function tipo_usuario()
{



 if (current_user_can('es_admin')) {
          // Contenido para los usuarios con capacidad para actualizar el sistema (es decir, administradores)
          echo 'Tú debes ser el apoderado, ¿verdad?. Bienvenido a tu sitio!';
     } elseif (current_user_can('es_profesor')) {
          // Contenido para editores y usuarios con un rol superior (con capacidad para editar páginas)
          echo 'Hola tu eres un Profesor!';
}


}

function ejecutar_informe()
{
    if (current_user_can('es_admin')) 
    {
          // Contenido para los usuarios con capacidad para actualizar el sistema (es decir, administradores)
          echo 'Hola Administrador, acá deberia ir el panel de Administración de Notas!';
    } elseif (current_user_can('es_apoderado'))
    {

    global $current_user;
        get_currentuserinfo();

    echo '<div class="container" align="left">

    <h4>Bienvenido '.$current_user->user_firstname.' '.$current_user->user_lastname.'.</h4>
    <select id="combo_alumnos" onchange="mostrar_notas( this.options[this.selectedIndex].value )">
    <option value="">Seleccionar Pupilo...</option>


    </select>


    <table id="tabla_alumnos" class="table table-striped table-hover" >

    </table>
    </div>';

    } elseif (current_user_can('es_profesor'))
    {

         echo 'Esta sección aún no está habilitada para Profesores.';
    } 

}

?>


<?php
function cargarAlumnos() { 

  global $current_user;
        get_currentuserinfo();

  $login = $current_user->user_login ;     
  //global $nombre = $current_user->user_firstname ; 
  //global $apellido = $current_user->user_lastname ; 


  ?>
  <script type="text/javascript">
    jQuery(document).ready( function($) {
       obtiene_alumnos(<?php echo "'"+$login+"'" ?>);
    });
  </script>
<?php }


add_action('wp_head', 'cargarAlumnos');
?>