package com.artlink.controller;


import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoClientDto;
import com.artlink.service.WebSocketService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    WebSocketService webSocketService;
    SimpMessagingTemplate messagingTemplate;

    public WebSocketController(WebSocketService webSocketService, SimpMessagingTemplate messagingTemplate) {
        this.webSocketService = webSocketService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/draw")
    public void share(String jsonMessage) throws JsonProcessingException {
        DrawingActionDto drawingActionDto = webSocketService.processDrawingAction(jsonMessage);
        messagingTemplate.convertAndSend("/topic/" + drawingActionDto.getPaintId(), drawingActionDto);
    }
    @MessageMapping("/undo.redo")
    public void getDrawingActionDto(UndoRedoClientDto undoRedoClientDto) {
        DrawingActionDto dto = webSocketService.processUndoRedoAction(undoRedoClientDto);
        messagingTemplate.convertAndSend("/topic/" + dto.getPaintId(), dto);
    }
}
