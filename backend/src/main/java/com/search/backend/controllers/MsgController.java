package com.search.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("msg")
public class MsgController {

//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;
//
//    @PostMapping
//    private void sendOrder(String msgId, String msg) {
//        kafkaTemplate.send("msg", msgId, msg);
//    }
}
