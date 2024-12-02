package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Circle extends Shape {
    private Integer radius;
}
