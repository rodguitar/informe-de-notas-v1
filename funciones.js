      function obtiene_alumnos(entrarut)
      {

        var rut_apoderado = entrarut;

        $.getJSON('obtiene_alumnos.php', { rut: rut_apoderado }, procesa_alumnos);

        function procesa_alumnos(data)
        {

            var html_info = '';

            $.each(data, function(name, info)
            {
                html_info += obtiene_algo(info);
            }

            ); //end of each()

            $('#combo_alumnos').append(info_html);
        }


       function obtiene_algo(info)
       {
         info_html = '';
         info_html += "<option value='" + info.runalumno + "'>"+ info.nombres + info.paterno + info.materno + "</option>";
         return info_html
       }

     }



      function mostrar_notas(entrarut)
      {

        $('#tabla_alumnos').empty();

        var cantidad_maxima = 0;

        //var rut_alumno = "33333333-3";

        var rut_alumno = entrarut;

        var maxima = 5;

        var primera_ejecucion=0;

        // busca para contar el maximo de asignaturas

        $.getJSON('busca_asignaturas.php', { rut: rut_alumno }, cuenta_notas);

        $.getJSON('busca_asignaturas.php', { rut: rut_alumno }, procesa_asignaturas);


        function cuenta_notas(data)
        {

            var codigox = 0;
            $.each(data, function(name, info)
            {
                codigox = codigo(info);
                //info_html += add_row(info);

                $.getJSON('cuenta_notas.php', { asig: codigox, rut: rut_alumno }, contador_maximo);
            }

            ); //end of each()
            
            //$('#tabla_alumnos').append("hola");
        } //end

        //termina conteo de asignaturas

        //echo cantidad_maxima;
        

        function procesa_asignaturas(data)
        {
            var info_html = '';
            var numero = 0;




            $.each(data, function(name, info)
            {
                numero = codigo(info);
                //info_html += add_row(info);

                $.getJSON('busca_notas.php', { asignatura: numero, rut: rut_alumno }, procesa_notas);
            }

            ); //end of each()
            
            //$('#tabla_alumnos').append(info_html);
        } //end of process_contacts


        function contador_maximo(data)
        {

            var info_html = '';
            var nuevo_maximo = 0;

            $.each(data, function(name, info)
            {
                nuevo_maximo = parseInt( obtiene_maximo(info) );


            }            

            ); //end of each()

            if (cantidad_maxima < nuevo_maximo)
            {
                cantidad_maxima = nuevo_maximo;
            }

            //info_html += ""+cantidad_maxima+"";

            //$('#tabla_alumnos').append(info_html);


        }


        function procesa_notas(data)
        {
            var info_html = '';
            var numero = 0;
            var contador = 0;



            
            if (contador < cantidad_maxima && primera_ejecucion == 0)
            {

                info_html += "<thead>";
                info_html += "<tr>";
                info_html += "<th>ASIGNATURA</th>";
                
                while (contador < cantidad_maxima)
                {
                    info_html += "<th>Nota "+(contador+1)+"</th>";
                    contador = contador + 1;
                }
                primera_ejecucion=primera_ejecucion+1;

                info_html += "</tr></thead>";
            }

            

            info_html += "<tr>";

            $.each(data, function(name, info)
            {

                if (numero == 0)  info_html += agrega_nombre(info);
                info_html += agrega_nota(info);
                numero = numero+1;
                
            }

            ); //end of each()


            if (numero < cantidad_maxima)
            {
                while (numero < cantidad_maxima)
                {
                    info_html += "<td>--</td>";
                    numero = numero +1;
                }
            }


            info_html += "</tr>";
            
            $('#tabla_alumnos').append(info_html);
        }

        function codigo(info){

          cod_asig = info.codigo_asignatura;

          return cod_asig
        }

        function agrega_nota(info){
          row = "<td>" + info.valor1 + "</td>";
          return row
        }

        function agrega_nombre(info){
          row = "<td>" + info.nombre + "</td>";
          return row
        }

        function obtiene_maximo(info){
          cantidad = info.cantidad;
          return cantidad
        }


      }