package com.artlink.controller;

import com.artlink.model.dto.AllShapesDto;
import com.artlink.model.shapes.Shape;
import com.artlink.repository.IShapeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PaintsController {

    IShapeRepository shapesRepository;

    public PaintsController(IShapeRepository shapesRepository) {
        this.shapesRepository = shapesRepository;
    }

    @GetMapping("app/shapes/{paintid}")
    public List<AllShapesDto> getShapes(@PathVariable String paintid) {
        return toDto(shapesRepository.findAllShapes(paintid));
    }


    public List<AllShapesDto> toDto(List<Shape> shapes) {
        List<AllShapesDto> list = new ArrayList<>();
        for (Shape shape : shapes) {
            AllShapesDto dto = new AllShapesDto();
            dto.setType(shape.getClass().getSimpleName().toLowerCase());
            dto.setShape(shape);
            list.add(dto);
        }
        return list;
    }

}
