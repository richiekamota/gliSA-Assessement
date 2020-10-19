<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LottoResults;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\LottoResultsCollection;


class PlayLottoController extends Controller
{

    public $mainDrawSet;
    public $mainBallsDrawn; 
    public $powerBallSet;
    public $powerballBallsDrawn;  

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get lotto results from the database
        $lottoResults = LottoResults::orderBy('created_at','desc')->paginate(10);

        return LottoResultsCollection($lottoResults);
    }

    /**
     * Store the newly created resource in public variables.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request-> all(),
        [
            mainDrawSet => 'required|integer',
            mainBallsDrawn => 'required',
            powerBallSet => 'required',
            powerballBallsDrawn => 'required',
        ]);    
        if ($validator->fails()){

            $mainDrawSet = $request->mainDrawSet;
            $mainBallsDrawn = $request->mainBallsDrawn;
            $powerBallSet = $request->powerBallSet;
            $powerballBallsDrawn = $request->powerballBallsDrawn; 

        } else {

            return response()->json(["status"=> "failed", "message"=> "validation_error", "errors" => $validator->errors()]);
        } 
        
    }

    /**
     *  Generate random number from the populated variables.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function playLotto(){

        $drawResult = [];

        if ($mainDrawSet){
           $drawResult = $this->draw($mainDrawSet,$mainBallsDrawn);
        }
          
        if ($powerBallSet > 0){
           $drawResult = array_merge($drawResult,$this->draw($powerBallSet,$powerballBallsDrawn)); 
        }
         
        $drawDateNow = Carbon::now()->toDateTimeString();

        $lottoResults = new LottoResults();
        $lottoResults -> results = $drawResult;
        $lottoResults -> main_draw_balls = $mainBallsDrawn;
        $lottoResults -> power_balls = $powerballBallsDrawn;
        $lottoResults -> draw_date = $drawDateNow;

        if ($lottoResults ->save()) {

          return response()->json(["status" => "200","success" => true, "message" => "Lotto results successfully saved!"]);
       
        } else {

          return response()->json(["status" => "Failed", "success" => false, "message" => "Oops saving lotto results failed"]);
        }
    } 

    public function draw($setSize, $drawSize)
    {
        $ballDrawn = 0;

        $results = [];

        while(count($results) < $drawSize) {
          $ballsDrawn = floor(rand() * $setSize) + 1;
          if (!in_array($ballDrawn,$results)) {
            $results.push($ballDrawn);
          }
        }
        return $results;    
    }    
  
}
