<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LottoResults;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class PlayLottoController extends Controller
{

    public $mainDrawSet;
    public $mainBallsDrawn; 
    public $powerBallSet;
    public $powerballBallsDrawn;  
    public $results = [];
    public $drawResult = [];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get lotto results from the database
        $lottoResults = LottoResults::orderBy('created_at','desc')->paginate(10);

        //return LottoResultsCollection($lottoResults);
        return response()->json($lottoResults);
        //Log::info($lottoResults);
    }

    /**
     * Store the newly created resource in public variables.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      Log::info($request->draw['mainDrawSet']);

        $validator = Validator::make($request-> all(),
        [
          $request->draw['mainDrawSet'] => 'required|integer',
          $request->draw['mainBallsDrawn'] => 'required|integer',
          $request->draw['powerBallSet'] => 'required|integer',
          $request->draw['powerballBallsDrawn'] => 'required|integer',
        ]);    

        Log::info($request->draw['powerBallSet']);
  
      // if (!$validator->fails()){

         $this->mainDrawSet = $request->draw['mainDrawSet'];
         $this->mainBallsDrawn = $request->draw['mainBallsDrawn'];
         $this->powerBallSet = $request->draw['powerBallSet'];
         $this->powerballBallsDrawn = $request->draw['powerballBallsDrawn']; 

          Log::info('MainDrawSet:'.$this->mainDrawSet.' MainBallsDrawn: '.$this->mainBallsDrawn. ' PowerBallSet: '.$this->powerBallSet.' PowerballBallsDrawn: '.$this->powerballBallsDrawn);

        //} else {

            // return response()->json(["status"=> "failed", "message"=> "validation_error", "errors" => $validator->errors()]);            
       // } 
        $this->playLotto();
              
    }

    /**
     *  Generate random number from the populated variables.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function playLotto(){ 
      
      $drawResult = [];
      
      if ($this->powerballBallsDrawn == 0){
        $drawResult = $this->draw($this->mainDrawSet,$this->mainBallsDrawn);  
        $this->drawResult = $drawResult; 
      }

      if ($this->powerballBallsDrawn > 0){
        $drawResult = $this->draw($this->powerBallSet,$this->powerballBallsDrawn);
        $this->drawResult = $drawResult; 
      }         
      Log::info('PowerballBallsDrawn:'.print_r($this->drawResult,true));
      
        // switch ($this->drawResult) {

        //   case ($this->powerballBallsDrawn == 0):
        //     $this->drawResult = $this->draw($this->powerBallSet,$this->powerballBallsDrawn);             
        //   break;
        //   case ($this->powerballBallsDrawn > 0):
        //     $drawResult = $this->draw($this->powerBallSet,$this->powerballBallsDrawn);
        //   break;  
               
          //  default:     
          //  $drawResult = $this->draw($this->mainDrawSet,$this->mainBallsDrawn);     

           
       // }
                        
          
         Log::info('DrawResult:'.print_r($this->drawResult,true));

        $drawResult = implode(',',$this->drawResult);

        $drawDateNow = Carbon::now()->toDateTimeString();

        $lottoResults = new LottoResults();
        $lottoResults -> results =  $drawResult;
        $lottoResults -> main_draw_balls = $this->mainBallsDrawn;
        $lottoResults -> power_balls = $this->powerballBallsDrawn;
        $lottoResults -> draw_date = $drawDateNow;

        if ($lottoResults ->save()) {

          return response()->json(["status" => "200","success" => true, "message" => "Lotto results successfully saved!"]);
       
        } else {

          return response()->json(["status" => "Failed", "success" => false, "message" => "Oops saving lotto results failed"]);
        }
    } 

    public function draw($setSize, $drawSize)
    {
        $ballsDrawn = 0;

        //$results = [];

        while(count($this->results) <= $drawSize-1) {
            $ballsDrawn = floor(random_int(1,$setSize));
          //if (in_array($ballsDrawn,$this->results)) {
            
            $results = array_push($this->results,$ballsDrawn);
          
         // }
        }
        return $this->results;    
    }    

    //  public function draw($min, $max, $drawSize, $setSize) {

    //    $ballsDrawn = 0;

    //    $numbers = range($min, $max);
    //    shuffle($numbers);
       
    //       while(count($this->results) <= $drawSize) {
    //        $ballsDrawn = array_slice($numbers, 0, $setSize); 
    //         //if (in_array($ballsDrawn,$this->results)) {              
    //           $results = array_merge($this->results,$ballsDrawn);            
    //        // }
    //       }
    //       return $this->results;
    //  }
  
}
