<?php
session_start();
$connection=mysqli_connect('localhost','root','');
if(isset($_POST['submit']))
{
    $image = $_FILES['image']['tmp_name'];
    $image = addslashes(file_get_contents($image));
    
    $username=$_SESSION['username'];
    $query="UPDATE `registration` SET `image`='$image' WHERE `username`='$username'";
    $result=mysqli_query($connection,$query);
    $query="UPDATE * SET `image`='$image' WHERE `login`='$username'";
    $result=mysqli_query($connection,$query);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <link rel="stylesheet" href="./css/3.css" />
    <link rel="stylesheet" href="./css/медцвет.css">
    <link rel="stylesheet" href="./css/каталог.css">
    <link rel="stylesheet" href="./css/личныйкабинет.css">
</head>
<body>


    <div class="all">     
        <div class="menu">
            
        <ul>
                <li><a href="каталог.html">Каталог</a> </li>
                <li><a class="btn-1 hover-filled-opacity"  data-modal-button="modal-1"  type="button">О нас</a></li>
                <li><a>Помощь</a></li>
                <li><a href="Главная.php">Главная</a></li>
                <?php
                session_start();
                if(isset($_SESSION['username'])){
                    echo'<li><a href="личныйкабинет.php">'. $_SESSION['username'] .'</a></li>';
                    
                }else{
                    echo'<li><a href="авторизация.php">'. 'Войти' .'</a></li>';
                   
                }
            ?>
            </ul>
        </div>
        <h1>Личный кабинет</h1>
        <div class='account-view-avatar'>    

<div class="grid1">



<?php
    

    $connection=mysqli_connect('localhost','root','','regist');
    $username=$_SESSION['username'];
    $result5= mysqli_query($connection, "SELECT * FROM `registration` WHERE `username`='$username'");

    while($cat=mysqli_fetch_assoc($result5)){
        echo '<img class="avatar" width = "10%" heaight="10%" src="data:image/png;base64,'.base64_encode($cat['image']).'">';
        
       
    }



?>
<?php echo '<p>Ваш логин: ' . $_SESSION['username']. '</p>';?> 
<br>
<p class='btn-7 btn-66' ><a class='btn-7 btn-66' >Мои данные</a></p>
<a><p class='btn-5 btn-66'>Мои заказы</p></a>
<p><a class='btn-6 btn-66'>Тех. Поддержка</a></p>
<br>
<p><a  data-modal-button="modal-1" class="btn-66" type="button">Изменить автар</a></p>
<p><a href='сменапароля.php' class='btn-66'>Сменить пароль</a></p>
<?php
echo'<p><a  class="btn-66" href="exit.php">'. 'Выйти' .'</a></p>';
?>
</div>
<div class="grid2">

<div class='' id='content1'>
<h2>Мои данные </h2>
<br>
<h2>Личная информация</h2>
<label type='text'  placeholder='Имя'><input type='text' class='knopka2' placeholder = 'Фамилию'></label>

<input type='text' class='knopka2' placeholder = 'Фамилию'>
<br>
<br>
<h2>Адрес</h2>
<input type='text' class='knopka2' placeholder = 'Город'>
<input type='text' class='knopka2' placeholder = 'Улица'>
<input type='text' class='knopka2' placeholder = 'Дом'>
</div>
<div class='hidden' id='content'>

    <div class="flex">
    <?php

    $connection = mysqli_connect('localhost','root','', 'lesson');
    $login=$_SESSION['username'];
    $result= mysqli_query($connection, "SELECT * FROM `мёд` WHERE `username1`='$login'");
    $result1= mysqli_query($connection, "SELECT * FROM `мочало` WHERE `username1`='$login'");

    while( ($cat=mysqli_fetch_assoc($result)) ){
                echo '<div class="tovar23">' .'<a href = "мёд.php">'.'<img src="./jpg/мёд3.jpg" alt="" class="kri">' .'Мёд: ' . $cat['street'] .'<br>'.'Улица: '. $cat['city'] .'<br>'.'Количество: '. $cat['amount'] .'<br>'.'Цена: '. $cat ['summ'] .' рублей'.'</a>'. '</div>' . '<br>';
            }
    while( ($cat=mysqli_fetch_assoc($result1)) ){
               echo '<div class="tovar23">' .'<a href = "мочало.php">'.'<img src="./jpg/мочало.jpg" alt="" class="kri">' .'Мочало: ' . $cat['street'] .'<br>'.'Улица: '. $cat['city'] .'<br>'.'Количество: '. $cat['amount'] .'<br>'.'Цена: '. $cat ['summ'] .' рублей'.'</a>'. '</div>' . '<br>';
    }
     
    ?>

</div>

    </div>
    <div class='hidden' id='support'>

    <?php
    
    ?>
    
    </div>
</div>
</div>



</div>

</div>
</div>
<div id="modal-1" data-modal class="fade-block hidden">
    <div class="modal-window">
        <div class="card1">
            <div class="card-header">
               Загрузить аватар
            </div>
            <div class="card-body">
                <div class="details-wrapper">
                    
                        <div  data-action="minus"></div>
                        </div>
                        <div  data-action="plus"></div>
                        <form method="POST" enctype="multipart/form-data">
                            <input type="file" accept="image/png, image/jpeg" name="image" />
                            <input name='submit' type='submit' class='btn-dark2' value='Отправить'>
                            </form>

                   <br>
                <div>
                    
                    <button
                    data-modal-close
                    type="button"
                    class="btn-dark3"
                >
                    Закрыть окно
                </button>
                
            </div>
</div>
</div>
</div>
</div>

<div class=footer>
             <p class="phion"> Тех. Поддержка</p>
               <p class="phion"> Наш адрес: ул. Красноармейская д .4  </p>  
<p class="phion">Телефон: +7 (999) 999-99-99</p>
<p class="phion">Наш адрес: ул. Красноармейская д .4</p>
</div>

<script src='./js/личныйкабинет.js'></script>
<script src='./js/01-modal.js'></script>
</script>
</body>
</html>