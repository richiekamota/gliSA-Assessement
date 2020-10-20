<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\LottoResults;

class TaskController extends Controller
{
    public function exportCsv(Request $request)
    {
       $fileName = 'lotto.csv';
       $results = LottoResults::orderBy('created_at','desc')->paginate(10);
    
            $headers = array(
                "Content-type"        => "text/csv",
                "Content-Disposition" => "attachment; filename=$fileName",
                "Pragma"              => "no-cache",
                "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
                "Expires"             => "0"
            );
            
    
            $columns = array('results', 'main_draw_balls', 'power_balls', 'draw_date');
    
            $callback = function() use($results, $columns) {
                $file = fopen('php://output', 'w');
                fputcsv($file, $columns);
    
                foreach ($results as $result) {
                 
                    $row['Draw Time']  = $result->draw_date;
                    $row['Draw Result']    = $result->results;
                    $row['Number of Main Balls Drawn']    = $result->main_draw_balls;
                    $row['Number of Main Balls Drawn']  = $result->power_balls;
    
    
                    fputcsv($file, array($row['Draw Time'], $row['Draw Result'], $row['Number of Main Balls Drawn'], $row['Number of Main Balls Drawn']));
                }
    
                fclose($file);
            };
    
            return response()->stream($callback, 200, $headers);
        }
}
