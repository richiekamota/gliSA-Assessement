<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\LottoResults::class, function (Faker $faker) {
    return [
       
        'results' => $faker->randomNumber(6),
        'main_draw_balls' => $faker -> numberBetween($min = 5, $max = 7),
        'power_balls' => $faker -> numberBetween($min = 0, $max = 3),
        'draw_date'=>$faker->dateTimeBetween('-1 day',now())
    ];
});
