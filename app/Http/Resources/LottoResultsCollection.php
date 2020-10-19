<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LottoResultsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        
        return [

            'id' => $this->id,
            'results' => $this->results,
            'main_draw_balls' => $this->main_draw_balls,
            'power_balls' => $this->power_balls,
            'draw_date' => $this->draw_date 
        ];
    }
}
