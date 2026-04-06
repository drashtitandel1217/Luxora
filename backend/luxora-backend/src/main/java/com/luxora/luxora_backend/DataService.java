package com.luxora.luxora_backend;

import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.util.*;

@Service
public class DataService {

    public List<Map<String,String>> readOrders(){

        List<Map<String,String>> data = new ArrayList<>();

        try{

            CSVReader reader = new CSVReader(
                    new FileReader("data/olist_orders_dataset.csv"));

            String[] header = reader.readNext();
            String[] line;

            while((line = reader.readNext()) != null){

                Map<String,String> row = new HashMap<>();

                for(int i=0;i<header.length;i++){
                    row.put(header[i],line[i]);
                }

                data.add(row);
            }

        }catch(Exception e){
            e.printStackTrace();
        }

        return data;
    }
}