<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LottoResults extends Model
{
    protected $casts = [
        'results' => 'array'
    ];
    
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */

    protected $fillable = [
       'results', 'main_draw_balls', 'power_balls', 'draw_date'
   ];
   
}
