package com.aharrar.demo_spring_angular.web;

import com.aharrar.demo_spring_angular.entities.Payment;
import com.aharrar.demo_spring_angular.entities.PaymentStatus;
import com.aharrar.demo_spring_angular.entities.PaymentType;
import com.aharrar.demo_spring_angular.entities.Student;
import com.aharrar.demo_spring_angular.repository.PaymentRepository;
import com.aharrar.demo_spring_angular.repository.StudentRepository;
import com.aharrar.demo_spring_angular.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
public class PaymentRestController {

    private StudentRepository studentRepository;

    private PaymentRepository paymentRepository;

    private PaymentService paymentService;


    public PaymentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository, PaymentService paymentService) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
    }

    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }

    @GetMapping("/payments/byStatus")
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus status){
        return paymentRepository.findByStatus(status);
    }

    @GetMapping("/students/byType")
    public List<Payment> paymentsByType(@RequestParam PaymentType type){
        return paymentRepository.findByType(type);
    }


    @GetMapping(path = "/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentRepository.findById(id).get();
    }

    @GetMapping("/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return studentRepository.findByCode(code);
    }

    @GetMapping("/studentsByProgramId")
    public List<Student> getStudentsByprogramId(@RequestParam String programId){
        return studentRepository.findByProgramId(programId);
    }

    @PutMapping("/payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status,@PathVariable Long id){
        return paymentService.updatePaymentStatus(status,id);
    }

    @PostMapping(path = "/payments",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam MultipartFile file, LocalDate date,double amount,PaymentType type,String studentCode) throws Exception{
        return this.paymentService.savePayment(file,date,amount,type,studentCode);

    }

    @GetMapping(path = "paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws Exception{
        return paymentService.getPaymentFile(paymentId);
    }
}
