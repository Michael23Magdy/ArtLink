package com.artlink.service;


import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.shapes.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ShapesMappingService {

    public final ObjectMapper objectMapper = new ObjectMapper();

    public DrawingActionDto handleJsonMapping(String jsonMessage) throws JsonProcessingException {
        Map<String, Object> map = objectMapper.readValue(jsonMessage, new TypeReference<Map<String, Object>>() {});
        return DrawingActionDto.builder()
                .paintId((String) map.get("paintId"))
                .action((String) map.get("action"))
                .type((String) map.get("type"))
                .shape( handleObjectMapping(map.get("shape"),(String) map.get("type")) )
                .build();
    }

    public Shape handleObjectMapping(Object obj, String type) {
        Map<String, Object> shape = (Map<String, Object>) obj;
        return switch (type) {
            case "rectangle" -> objectMapper.convertValue(shape, Rectangle.class);
            case "ellipse" -> objectMapper.convertValue(shape, Ellipse.class);
            case "circle" -> objectMapper.convertValue(shape, Circle.class);
            case "line" -> objectMapper.convertValue(shape, Line.class);
            case "polygon" -> objectMapper.convertValue(shape, Polygon.class);
            case "text" -> objectMapper.convertValue(shape, Text.class);
            case "triangle" -> objectMapper.convertValue(shape, Triangle.class);
            case "freehand"-> objectMapper.convertValue(shape, FreeHand.class);
            default -> throw new IllegalArgumentException("Unsupported type: " + type);
        };
    }
}
