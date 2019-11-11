package com.hautc.finalproject.controller.api;

import com.hautc.finalproject.dto.StatisticalDTO;
import com.hautc.finalproject.service.IProductService;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private IProductService productService;

    @RequestMapping(value = "/statistical-list", method = RequestMethod.GET)
    public String showStatistical(){
        return "statisticalList";
    }

    @RequestMapping(value = "/user-list", method = RequestMethod.GET)
    public String showUsers(){
        return "userList";
    }

    @GetMapping(value = "/api/statistical")
    @ResponseBody
    public List<StatisticalDTO> getStatisticalByMonth(@RequestParam(value = "m", name = "m", required = false) String month){
        LocalDate now = LocalDate.now();
        Integer year = now.getYear();
        if(!"none".equals(month) && month != null) {
            return productService.getStatisticalByMonth(month, year.toString());
        }
        return productService.getAllStatistical(year.toString());
    }

    @RequestMapping(value = "/report", method = RequestMethod.GET)
    public void export(@RequestParam(value = "m", name = "m", required = false) String month,
                 HttpServletResponse response) throws Exception{
        response.setContentType("application/x-download");
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"export-data-month-" + month + ".pdf\""));

        LocalDate now = LocalDate.now();
        Integer year = now.getYear();
        Map<String, Object> parameters = productService.parameters(month, productService.getStatisticalByMonth(month,year.toString()));

        InputStream inputStream = this.getClass().getResourceAsStream("/reports/report.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, new JREmptyDataSource());

        OutputStream out = response.getOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint,out);
    }
}
