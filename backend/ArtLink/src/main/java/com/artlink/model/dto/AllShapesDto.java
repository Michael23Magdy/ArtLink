package com.artlink.model.dto;

import com.artlink.model.shapes.Shape;
import lombok.Data;

@Data
public class AllShapesDto {
    private String type;
    private Shape shape;
}
