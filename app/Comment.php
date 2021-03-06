<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['comment','votes','users_id'];
    protected $dates = ['created_at', 'updated_at'];
}
