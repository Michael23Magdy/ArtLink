package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
@Data
@EqualsAndHashCode(callSuper = true)
public class Triangle extends Shape {
    List<Integer> points;
}
