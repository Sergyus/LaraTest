<?php

Route::get('/', function () {
    return view('comments');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
