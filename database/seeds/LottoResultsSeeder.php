<?php

use Illuminate\Database\Seeder;

class LottoResultsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\LottoResults::class,10)->create();
    }
}
