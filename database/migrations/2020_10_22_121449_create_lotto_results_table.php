<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLottoResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lotto_results', function (Blueprint $table) {
            $table->id();
            $table->dateTime('draw_date');
            $table->json('results');
            $table->integer('main_draw_balls');
            $table->integer('power_balls');           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lotto_results');
    }
}
