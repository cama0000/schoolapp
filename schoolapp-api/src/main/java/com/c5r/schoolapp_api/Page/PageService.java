package com.c5r.schoolapp_api.Page;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Student.Student;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PageService {
    @Autowired
    private PageRepository pageRepository;

    @Transactional
    public Page save(Page page){ return pageRepository.save(page);}

    @Transactional
    public Optional<Page> findById(Long id){return pageRepository.findById(id);}

    @Transactional
    public Set<Page> findPagesByCourse(Long id){ return pageRepository.findByCourseId(id); }

    @Transactional
    public Page savePageContent(Long id, Page request) {
        Page page = pageRepository.findById(id).orElse(null);

        page.setContent(request.getContent());

        return pageRepository.save(page);
    }

    @Transactional
    public void delete(Page page){ pageRepository.delete(page);};

    @Transactional
    public Set<Page> findPagesByStudent(Long id) {
        return pageRepository.findByStudentId(id);
    }

    @Transactional
    public Set<Page> findPagesBySearch(Long id, String search){
        return pageRepository.findBySearch(id, search);
    }

    @Transactional
    public void deleteByStudentId(int id) {
        pageRepository.deleteByStudentId(id);
    }
}


